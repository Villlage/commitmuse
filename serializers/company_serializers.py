from app import ma
from models.company import Company


class AdminCompanySchema(ma.ModelSchema):  # type: ignore
    class Meta:
        model = Company
