from app import ma
from models.isa import ISA


class AdminIsaSchema(ma.ModelSchema):  # type: ignore
    class Meta:
        model = ISA
