from app import mongo
from app.Models.super_clase import SuperClass


class PokemonFavorites(SuperClass):
    def __init__(self):
        super().__init__("pokemon_favorites")

    
    def update(self,object_id,data):
        raise NotImplementedError("no puedes updatear pokemons")

    
    def find_by_id(self,object_id):
        raise NotImplementedError("no puedes traer un pokemon")

    

#crea
#elimina
#get all
#get one