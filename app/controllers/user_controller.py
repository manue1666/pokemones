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
    user = user_model.get_by_email_password(email, password)
    if not user:
        return RM.error("No se encontro el usuario")
    if not EM.compare_hashes(password, user["password"]):
        return RM.error("Credenciales invalidas")
    return RM.success({"user": user, "token":create_access_token(user["_id"])})

@bp.route("/register", methods=["POST"])
def register():
    try:
        data = user_schema.load(request.json)
        data["password"] = EM.create_hash(data["passwords"])
        user_id= user_model.create(data)
        return RM.success({"user_id":str(user_id), "token":create_access_token(str[user_id])})
    
    except ValidationError as error:
        return RM.error("Los parametros enviados son incorrectos")    

@bp.route("/update", methods=["PUT"])
@jwt_required()
def update():
    user_id = get_jwt_identity
    try:
        data = user_schema.load(request.json)
        user = user_model.update(ObjectId(user_id), data)
        return RM.success({"data": user})
    except ValidationError as err:
        return RM.error("Los parametros enviados son incorrectos")
    
@bp.route("/delete", methods=["DELETE"])
@jwt_required()
def delete():
    user_id = get_jwt_identity
    user_model.delete(ObjectId(user_id))
    return RM.success("Usuario eliminado con exito")

@bp.route("/get", methods=["GET"])
@jwt_required()
def get_user():
    user_id = get_jwt_identity
    user = user_model.find_by_id(ObjectId(user_id))
    return RM.success(user)