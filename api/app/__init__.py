from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
import os
from flask_jwt_extended import JWTManager
from datetime import timedelta

load_dotenv()

mongo = PyMongo()
jwt = JWTManager()


def create_app():
    app=Flask(__name__)
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    mongo.init_app(app)

    jwt.init_app(app)
    from app.controllers import(
        pokemon_favorite_controller,
        pokemons_controller,
        user_controller
    )
    app.register_blueprint(pokemons_controller.bp)
    app.register_blueprint(pokemon_favorite_controller.bp)
    app.register_blueprint(user_controller.bp)
    CORS(app)
    return app