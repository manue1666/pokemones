from marshmallow import Schema, fields, ValidationError

class UserSchema(Schema):
    name = fields.Str(
        required=True,
        validate =lambda x: len(x)>0,
        error_massages={
            "required":"el nombre es requerido"
        }
    )

    password = fields.Str(
        required=True,
        validate =lambda x: len(x)>0,
        error_massages={
            "required":"la contra es requerido"
        }
    )

    email = fields.Email(
        required=True,
        validate =lambda x: "@utma.edu.mx" in x,
        error_massages={
            "required":"el correo es requerido"
        }
    )