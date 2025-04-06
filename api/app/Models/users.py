from app import mongo
from app.Models.super_clase import SuperClass

class User(SuperClass):
    def __init__(self):
        super().__init__("users")

    def find_all(self):
        raise NotImplementedError("no es necesario traer los usuarios")
    
    def get_by_email_password(self, email):
        user = self.collection.find_one({"email": email})
        if user:
            user["_id"] = str(user["_id"])
        return user


user_model = User()
