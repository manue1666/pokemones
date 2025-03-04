from app import mongo
from app.Models.super_clase import SuperClass
from bson import ObjectId

class PokemonFavorites(SuperClass):
    def __init__(self):
        super().__init__("pokemon_favorites")

    
    def update(self,object_id,data):
        raise NotImplementedError("no puedes updatear pokemons")

    
    def find_by_id(self,object_id):
        raise NotImplementedError("no puedes traer un pokemon")
    
    def find_all(self, user_id):
        data = self.collection.find({"user_id": user_id})
        return list(data)

    def create(self,data):
        data["user_id"] = ObjectId(data["user_id"])
        data["pokemon_id"] = ObjectId(data["pokemon_id"])
        datum= self.collection.insert_one(data)
        return str(datum.inserted_id)
    

#crea
#elimina
#get all
#get one