from marshmallow import Schema, fields
from app import ma
from models.isa import ISA

# from marshmallow.validate import OneOf, Range


class LoginSchema(Schema):  # type: ignore
    email = fields.Email(allow_none=False, required=True)
    password = fields.Str(allow_none=False, required=True)


class UpdateISASchema(Schema):  # type: ignore
    current_income = fields.Int(required=False)
    percentage = fields.Float(required=False)
    cap = fields.Int(required=False)
    time_to_be_paid = fields.Int(required=False)
    description = fields.Str(required=False)
    status = fields.Str(required=False)
    coach_id = fields.Int(required=False)
    student_id = fields.Int(required=False)


class CreateISASchema(Schema):  # type: ignore
    current_income = fields.Int(required=True)
    percentage = fields.Float(required=True)
    cap = fields.Int(required=True)
    time_to_be_paid = fields.Int(required=True)
    status = fields.Str(required=False, default="Start")
    description = fields.Str(required=True)
    coach_id = fields.Int(required=True)
    student_id = fields.Int(required=False)


class ISASchema(ma.ModelSchema):  # type: ignore
    class Meta:
        model = ISA


login_schema = LoginSchema()

update_isa_schema = UpdateISASchema()
create_isa_schema = CreateISASchema()
isa_schema = ISASchema()
