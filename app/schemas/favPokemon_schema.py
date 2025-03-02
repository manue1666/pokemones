from marshmallow import Schema, fields, ValidationError

class favPokemonSchema(Schema):

    pokemon_id=fields.Int(
        required=True,
        validate=lambda x: len(x)>0,
        error_messages = {
            "required":"el id es requerido"
        }

    )

    user_id=fields.Str(
        required=True,
        validate=lambda x: len(x) > 0,
        error_message={
            "required":"el id de usuario es requerido"
        }
    )