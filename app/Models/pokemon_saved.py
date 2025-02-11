from app import mongo

class Pokemon_saved:
    collection = mongo.db.pokemons_saved

    @staticmethod
    def find_all():
        pokemons_saved = Pokemon_saved.collection.find()
        return list(pokemons_saved)
    
    @staticmethod
    def find_by_id(pokemon_saved_id):
        pokemon_saved = Pokemon_saved.collection.find_one({
            "_id":pokemon_saved_id
        })
        return pokemon_saved
    
    @staticmethod
    def create(data):
        pokemon_saved= Pokemon_saved.collection.insert_one(data)
        return pokemon_saved
    
    @staticmethod
    def update(pokemon_saved_id,data):
        pokemon_saved= Pokemon_saved.collection.update_one({
            "_id":pokemon_saved_id
        },{
            "$set":data
        })
        return pokemon_saved
    
    @staticmethod
    def delete(pokemon_saved_id):
        return Pokemon_saved.collection.delete_one({
            "_id":pokemon_saved_id
        })