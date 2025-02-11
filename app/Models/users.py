from app import mongo

class User:
    collection = mongo.db.users

    @staticmethod
    def find_all():
        users = User.collection.find()
        return list(users)
    
    @staticmethod
    def find_by_id(user_id):
        user = User.collection.find_one({
            "_id":user_id
        })
        return user
    
    @staticmethod
    def create(data):
        user= User.collection.insert_one(data)
        return user
    
    @staticmethod
    def update(user_id,data):
        user= User.collection.update_one({
            "_id":user_id
        },{
            "$set":data
        })
        return user
    
    @staticmethod
    def delete(user_id):
        return User.collection.delete_one({
            "_id":user_id
        })