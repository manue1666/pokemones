from app import mongo
from app.Models.super_clase import SuperClass


class PokemonFavorites(SuperClass):
    def __init__(self):
        super().__init__("pokemon_favorites")

    

    