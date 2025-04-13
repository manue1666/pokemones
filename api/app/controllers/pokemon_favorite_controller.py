from flask import Blueprint, request
from app.schemas.favPokemon_schema import favPokemonSchema
from app.Models.factory import ModelFactory
from app.tools.response_manager import responseManager
from marshmallow import ValidationError
from bson import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
 
RM = responseManager()
bp = Blueprint("pokemon_favorites", __name__, url_prefix="/pokemon_favorites")
pokemon_favorite_schema = favPokemonSchema()
pokemon_favorite_model = ModelFactory.get_model("pokemon_favorites")

def serialize_pokemon(pokemon):
    return {
        "_id": str(pokemon["_id"]),
        "ID": pokemon["ID"],
        "Name": pokemon["Name"],
        "Form": pokemon["Form"],
        "Type1": pokemon["Type1"],
        "Type2": pokemon["Type2"],
        "img": pokemon["img"],
        "stats": {
            "HP": pokemon["HP"],
            "Attack": pokemon["Attack"],
            "Defense": pokemon["Defense"],
            "Sp. Atk": pokemon["Sp"][" Atk"],
            "Sp. Def": pokemon["Sp"][" Def"],
            "Speed": pokemon["Speed"]
        },
        "Generation": pokemon["Generation"]
    }

@bp.route("/", methods=["POST"])
@jwt_required()
def create():
    user_id = get_jwt_identity()
    try:
        data = request.json
        data["user_id"] = user_id
        pokemon_id = pokemon_favorite_model.create(data)
        return RM.success({"_id": pokemon_id})
    except ValidationError as err:
        return RM.error("Los parámetros enviados son incorrectos")
    except Exception as e:
        print(f"Error en create: {str(e)}")
        return RM.error("Ocurrió un error al crear el favorito")

@bp.route("/delete_pokemon/<string:pokemon_id>", methods=["DELETE"])
@jwt_required()
def delete(pokemon_id):
    try:
        pokemon_favorite_model.delete(ObjectId(pokemon_id))
        return RM.success("Pokémon eliminado con éxito")
    except Exception as e:
        print(f"Error en delete: {str(e)}")
        return RM.error("Ocurrió un error al eliminar el Pokémon")

@bp.route("/get_pokemons/", methods=["GET"])
@jwt_required()
def get_all():
    try:
        user_id = get_jwt_identity()
        favorites = pokemon_favorite_model.find_all(user_id)
        
        # Debug: Imprimir lo que devuelve find_all
        print("Datos crudos de find_all:")
        print(json.dumps(favorites, indent=2, default=str))
        
        # Procesar los datos
        result = []
        for fav in favorites:
            result.append({
                "pokemon": serialize_pokemon(fav["pokemon"]),
                "user": {
                    "_id": str(fav["user"]["_id"]),
                    "name": fav["user"]["name"],
                    "email": fav["user"]["email"]
                }
            })
        
        return RM.success(result)
    except Exception as e:
        print(f"Error en get_all: {str(e)}")
        return RM.error("Ocurrió un error al obtener los Pokémon favoritos")