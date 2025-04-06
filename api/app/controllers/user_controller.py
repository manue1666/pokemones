from flask import Blueprint #seccionar servidor en diferentes urls
from flask import request, jsonify #manejar las respuestas del servidor
from app.schemas.user_schema import UserSchema
from app.Models.factory import ModelFactory
from app.tools.encryption_manager import EncryptionManager
from marshmallow import ValidationError
from bson import ObjectId
from app.tools.response_manager import responseManager
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

RM = responseManager()
EM = EncryptionManager()
#modulos con blueprint
bp = Blueprint("users", __name__, url_prefix="/users")
user_schema = UserSchema()
user_model = ModelFactory.get_model("user")

@bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    if not email or not password:
        return RM.error("Es necesario enviar todas las credenciales")
    
    user = user_model.get_by_email_password(email)
    if not user:
        return RM.error("No se encontró el usuario")
    
    if not EM.compare_hashes(password, user["password"]):
        return RM.error("Credenciales inválidas")
    
    return RM.success({
        "user_id": user["_id"],
        "token": create_access_token(user["_id"])
    })


@bp.route("/register", methods=["POST"])
def register():
    try:
        data = user_schema.load(request.json, partial=False)  # require todos los campos para registro
        data["password"] = EM.create_hash(data["password"])
        user_id = user_model.create(data)
        return RM.success({"user_id": str(user_id), "token": create_access_token(str(user_id))})
    except ValidationError as error:
        return RM.error("Los parámetros enviados son incorrectos")
    


@bp.route("/update", methods=["PUT"])
@jwt_required()
def update():
    user_id = get_jwt_identity()
    try:
        data = user_schema.load(request.json, partial=True)  # permite la validación parcial
        current_user = user_model.find_by_id(ObjectId(user_id))
        if not current_user:
            return RM.error("Usuario no encontrado")
        
        # Actualizar solo los campos especificados
        updated_data = {}
        if "name" in data:
            updated_data["name"] = data["name"]
        if "email" in data:
            updated_data["email"] = data["email"]
        
        result = user_model.update(ObjectId(user_id), updated_data)
        if result.modified_count > 0:
            updated_user = user_model.find_by_id(ObjectId(user_id))
            return RM.success({"data": updated_user})
        else:
            return RM.error("No se realizaron cambios")
    except ValidationError as error:
        print(error.messages)  # mensaje de error
        return RM.error("Los parámetros enviados son incorrectos")


    
@bp.route("/delete", methods=["DELETE"])
@jwt_required()
def delete():
    user_id = get_jwt_identity()
    user_model.delete(ObjectId(user_id))
    return RM.success("Usuario eliminado con exito")

@bp.route("/get", methods=["GET"])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = user_model.find_by_id(ObjectId(user_id))
    return RM.success(user)