from marshmallow import Schema, fields, ValidationError

class PokemonSchema(Schema):

    pokemon_id=fields.Str(
        required=True,
        validate=lambda x: len(x)>0,
        error_messages = {
            "required":"el id es requerido"
        }

    )

