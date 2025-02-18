from app import mongo
from app.Models.super_clase import SuperClass

class Pokemon(SuperClass):
    def __init__(self):
        super().__init__("pokemons")

    def create(self,data):
        raise NotImplementedError("los pokemones no se pueden crear")
    
    def delete(self, object_id):
        raise NotImplementedError("los pokemones no se pueden eliminar")
    
    def update(self,object_id,data):
        raise NotImplementedError("los pokemones no se pueden editar")
    