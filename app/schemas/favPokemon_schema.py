from marshmallow import Schema, fields, ValidationError

class favPokemonSchema(Schema):

    pokemon_id=fields.str(
        required=True,
        validate=lambda x: len(x)>0,
        error_messages = {
            "required":"el id es requerido"
        }

    )

    user_id=fields.str(
        required=True,
        validate=lambda x: len(x) > 0,
        error_message={
            "required":"el id de usuario es requerido"
        }
    )