from flask import Blueprint, request, jsonify
from app.schemas.pokemon_schema import PokemonSchema
from marshmallow import ValidationError
from app.Models.factory import ModelFactory
from bson import ObjectId

bp = Blueprint("pokemons",__name__,url_prefix="/pokemon")
pokemon = PokemonSchema()
pokemon_model = ModelFactory.get_model("pokemons")


@bp.route("/get_pokemon/<string:pokemon_id>", methods=["GET"])
def get_pokemon_by_id(pokemon_id):
    pokemon_model_= pokemon_model.find_by_id(ObjectId(pokemon_id))
    return jsonify(pokemon_model_,200)

@bp.route("/get_all_pokemons", methods=["GET"])
def get_pokemon_by_id():
    pokemon_model_= pokemon_model.find()
    return jsonify(pokemon_model_,200)