from app import mongo
from app.Models.super_clase import SuperClass
from bson import ObjectId

class PokemonFavorites(SuperClass):
    def __init__(self):
        super().__init__("pokemon_favorites")

    def update(self, object_id, data):
        raise NotImplementedError("No puedes actualizar pokémones favoritos")

    def find_by_id(self, object_id):
        raise NotImplementedError("No puedes buscar un pokémon favorito por ID")
    
    def find_all(self, user_id):
        try:
            pipeline = [
                {
                    "$match": {
                        "user_id": ObjectId(user_id)
                    }
                },
                {
                    "$lookup": {
                        "from": "pokemons",
                        "localField": "pokemon_id",
                        "foreignField": "_id",
                        "as": "pokemon"
                    }
                },
                {"$unwind": "$pokemon"},
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "user_id",
                        "foreignField": "_id",
                        "as": "user"
                    }
                },
                {"$unwind": "$user"},
                {
                    "$project": {
                        "pokemon": 1,
                        "user": {
                            "_id": 1,
                            "name": 1,
                            "email": 1
                        }
                    }
                }
            ]
            
            return list(self.collection.aggregate(pipeline))
            
        except Exception as e:
            print(f"Error en find_all: {str(e)}")
            raise e

    def create(self, data):
        try:
            data["user_id"] = ObjectId(data["user_id"])
            data["pokemon_id"] = ObjectId(data["pokemon_id"])
            result = self.collection.insert_one(data)
            return str(result.inserted_id)
        except Exception as e:
            print(f"Error en create: {str(e)}")
            raise e