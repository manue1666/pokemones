from flask import Blueprint, request, jsonify
from app.schemas.favPokemon_schema import favPokemonSchema
from marshmallow import ValidationError
from app.Models.factory import ModelFactory
from bson import ObjectId

bp = Blueprint("favorite_pokemons",__name__,url_prefix="/favorite_pokemon")
favorite_pokemon = favPokemonSchema()
favorite_pokemon_model = ModelFactory.get_model("pokemon_favorites")

@bp.route("/add_favorite_pokemon",methods=["POST"])
def add_favorite_pokemon():
    data = request.json
    pokemon_id = data.get("pokemon_id", None)
    user_id = data.get("user_id", None)
    if not pokemon_id and not user_id:
        return jsonify("no se pudo añadir",400)
    return jsonify(pokemon_id,200)

    
@bp.route("/delete_favorite_pokemon/<string:user_id,pokemon_id>", methods=["DELETE"])
def delete_favorite_pokemon(user_id,pokemon_id):
    favorite_pokemon_model.delete(ObjectId(user_id,pokemon_id))
    return jsonify("pokemon eliminado de favoritos", 200)

@bp.route("/get_favorite_pokemons/<string:user_id>", methods=["GET"])
def get_user(user_id):
    fav_pokemon_model= favorite_pokemon_model.find(ObjectId(user_id))
    return jsonify(fav_pokemon_model,200)

#crea
#elimina
#get all
#modificar clase del modelo y evitar que se usen metodos indebidos