from flask import Blueprint, jsonify 
from app.Models.factory import ModelFactory
from app.tools.response_manager import responseManager
from bson import ObjectId
from flask_jwt_extended import jwt_required

bp = Blueprint("pokemon", __name__, url_prefix="/pokemon")
RM = responseManager()
pokemon_model = ModelFactory.get_model("pokemons")

@bp.route("/get_pokemons/", methods=["GET"])
@jwt_required()
def get_pokemon():
    pokemons = pokemon_model.find_all()
    return RM.success(pokemons)

@bp.route("/get_pokemon/<string:pokemon_id>", methods=["GET"])
@jwt_required()
def get_user(pokemon_id):
    pokemon = pokemon_model.find_by_id(ObjectId(pokemon_id))
    return RM.success(pokemon)