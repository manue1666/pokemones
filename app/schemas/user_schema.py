from marshmallow import Schema, fields, ValidationError

class UserSchema(Schema):
    name = fields.str(
        required=True,
        validate =lambda x: len(x)>0,
        error_massages={
            "required":"el nombre es requerido"
        }
    )

    password = fields.str(
        required=True,
        validate =lambda x: len(x)>0,
        error_massages={
            "required":"la contra es requerido"
        }
    )

    email = fields.str(
        required=True,
        validate =lambda x: "@utma.edu.mx" in x,
        error_massages={
            "required":"el correo es requerido"
        }
    )