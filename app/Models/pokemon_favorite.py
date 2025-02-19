from app import mongo
from app.Models.super_clase import SuperClass


class PokemonFavorites(SuperClass):
    def __init__(self):
        super().__init__("pokemon_favorites")

    def create(self,data):
       pass 
    
    def delete(self, object_id):
       pass 
    
    def update(self,object_id,data):
        raise NotImplementedError("no puedes updatear pokemons")

    def find_all(self):
        pass
    
    def find_by_id(self,object_id):
        pass
    

#crea
#elimina
#get all
#get one