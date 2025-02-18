from app import mongo
from app.Models.super_clase import SuperClass

class User(SuperClass):
    def __init__(self):
        super().__init__("users")

    def create(self,data):
       pass 
    
    def delete(self, object_id):
       pass 
    
    def update(self,object_id,data):
        pass

    def find_all(self):
        raise NotImplementedError("no es necesario traer los usuarios")
    