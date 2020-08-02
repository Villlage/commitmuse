from typing import Dict, Any

from marshmallow import Schema, fields, pre_load
from app import ma
from models.isa import ISA


class LoginSchema(Schema):  # type: ignore
    email = fields.Email(allow_none=False, required=True)
    password = fields.Str(allow_none=False, required=True)
    first_name = fields.Str(required=False)
    last_name = fields.Str(required=False)


class ClientSchema(Schema):  # type: ignore
    email = fields.Email(allow_none=False, required=True)
    password = fields.Str(required=False, missing="")
    first_name = fields.Str(required=False)
    last_name = fields.Str(required=False)


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


class UserSchema(Schema):  # type: ignore
    email = fields.Email(allow_none=False, required=True)

    @pre_load  # type: ignore
    def process_email(self, data: Dict[str, Any], **kwargs) -> Dict[str, Any]:  # type: ignore
        if data["email"] is None:
            return data

        data["email"] = data["email"].lower().replace(" ", "")
        return data


login_schema = LoginSchema()

update_isa_schema = UpdateISASchema()
create_isa_schema = CreateISASchema()
isa_schema = ISASchema()
user_schema = UserSchema()
