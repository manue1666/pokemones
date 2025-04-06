from marshmallow import Schema, fields, ValidationError

class UserSchema(Schema):
    name = fields.Str(
        required=False,  # Cambiado a False para la actualización
        validate=lambda x: len(x) > 0,
        error_messages={
            "required": "El nombre es requerido"
        }
    )

    password = fields.Str(
        required=False,  # Cambiado a False para la actualización
        validate=lambda x: len(x) > 0,
        error_messages={
            "required": "La contraseña es requerida"
        }
    )

    email = fields.Str(
        required=False,  # Cambiado a False para la actualización
        validate=lambda x: "@utma.edu.mx" in x,
        error_messages={
            "required": "El correo es requerido"
        }
    )
