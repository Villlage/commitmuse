from marshmallow import Schema, fields
from app import ma
from models.isa import ISA
from models.user import User


class LoginSchema(Schema):  # type: ignore
    email = fields.Email(allow_none=False, required=True)
    password = fields.Str(allow_none=False, required=True)
    first_name = fields.Str(required=False)
    last_name = fields.Str(required=False)
    type = fields.Str(required=False, missing="coaches")


class ClientSchema(Schema):  # type: ignore
    email = fields.Email(allow_none=False, required=True)
    password = fields.Str(required=False, missing="")
    first_name = fields.Str(required=False)
    last_name = fields.Str(required=False)
    type = "students"


class UpdateISASchema(Schema):  # type: ignore
    current_income = fields.Int(required=False)
    percentage = fields.Float(required=False)
    cap = fields.Int(required=False)
    time_to_be_paid = fields.Int(required=False)
    description = fields.Str(required=False)
    status = fields.Str(required=False)
    coach_id = fields.Int(required=False)
    client = fields.Nested(ClientSchema, required=False)


class CreateISASchema(Schema):  # type: ignore
    current_income = fields.Int(required=True)
    percentage = fields.Float(required=True)
    cap = fields.Int(required=True)
    time_to_be_paid = fields.Int(required=True)
    status = fields.Str(required=False, default="Start")
    description = fields.Str(required=True)
    coach_id = fields.Int(required=True)
    client = fields.Nested(ClientSchema, required=True)


class ISASchema(ma.ModelSchema):  # type: ignore
    class Meta:
        model = ISA


class UserSchema(ma.ModelSchema):  # type: ignore
    class Meta:
        model = User


login_schema = LoginSchema()

update_isa_schema = UpdateISASchema()
create_isa_schema = CreateISASchema()
isa_schema = ISASchema()
user_schema = UserSchema()
