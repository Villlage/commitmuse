from marshmallow import Schema, fields
from app import ma
from models.isa import ISA
from models.company import Company
from models.user import User


class LoginSchema(Schema):  # type: ignore
    email = fields.Email(allow_none=False, required=True)
    password = fields.Str(allow_none=False, required=True)
    first_name = fields.Str(required=False)
    last_name = fields.Str(required=False)
    type = fields.Str(required=False, missing="coaches")


class UpdateUserSchema(Schema):  # type: ignore
    email = fields.Email(required=False)
    first_name = fields.Str(required=False)
    last_name = fields.Str(required=False)


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
    cancellation_period_weeks = fields.Int(required=False)
    coach_id = fields.Int(required=False)
    client = fields.Nested(ClientSchema, required=False)


class CreateISASchema(Schema):  # type: ignore
    current_income = fields.Int(required=True)
    percentage = fields.Float(required=True)
    cap = fields.Int(required=True)
    time_to_be_paid = fields.Int(required=True)
    status = fields.Str(required=False, default="Created")
    description = fields.Str(required=True)
    cancellation_period_weeks = fields.Int(required=True)
    coach_id = fields.Int(required=True)
    client = fields.Nested(ClientSchema, required=True)


class UserSchema(ma.ModelSchema):  # type: ignore
    class Meta:
        model = User
        exclude = (
            "updated_at",
            "created_at",
            "password",
            "confirmed_at",
            "coaches",
            "students",
        )


class ResetPasswordSchema(Schema):  # type: ignore
    token = fields.Str(allow_none=False, required=True)
    password = fields.Str(allow_none=False, required=True)


class ISASchema(ma.ModelSchema):  # type: ignore
    class Meta:
        model = ISA

    student = fields.Nested(UserSchema, required=True)
    coach = fields.Nested(UserSchema, required=True)


class CompanySchema(ma.ModelSchema):  # type: ignore
    class Meta:
        model = Company


class UpdateCompanySchema(Schema):  # type: ignore
    number_of_employees_estimate = fields.Str(required=False)
    name = fields.Str(required=False)
    address = fields.Str(required=False)


class CreateCompanySchema(Schema):  # type: ignore
    number_of_employees_estimate = fields.Str(allow_none=False, required=True)
    name = fields.Str(allow_none=False, required=True)
    address = fields.Str(allow_none=False, required=True)


class AdminUserSchema(ma.ModelSchema):  # type: ignore
    class Meta:
        model = User
        exclude = ("password",)


login_schema = LoginSchema()
user_schema = UserSchema()
reset_password_schema = ResetPasswordSchema()
update_user_schema = UpdateUserSchema()


isa_schema = ISASchema()
create_isa_schema = CreateISASchema()
update_isa_schema = UpdateISASchema()


update_isa_schema = UpdateISASchema()
create_isa_schema = CreateISASchema()

company_schema = CompanySchema()
create_company_schema = CreateCompanySchema()
update_company_schema = UpdateCompanySchema()
