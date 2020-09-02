from common.exceptions import (
    ResourceNotFound,
    AuthenticationError,
    AuthorizationError,
)
from models.isa import ISA
from typing import Any, Dict, Optional

from typing import Optional
from models.user import Student, User


def get_isa_by_id(isa_id: int, coach_id: int, student_id: Optional[int] = None) -> ISA:
    isa = _get_isa_by_id(isa_id)
    # if isa.coach_id != coach_id and isa.student_id != student_id:
    #     raise AuthorizationError("you are not authorized to view this")

    return isa


def _get_isa_by_id(isa_id: int) -> ISA:
    isa = ISA.get_isa_by_id(isa_id)
    if not isa:
        raise ResourceNotFound("ISA Not Found")
    return isa


def create_student_and_isa(schema: Dict[Any, Any]) -> ISA:
    """
    creating student from the dictionary and removing the client payload
    """
    student = User.get_user_by_email(schema["client"]["email"])
    if not student:
        student = Student.create_user(**schema["client"])
    schema.pop("client")
    schema["student_id"] = student.id

    isa = ISA.create_isa(**schema)
    return isa


def get_isa_by_id_with_access_token(isa_id: int, access_token: str) -> ISA:
    """
    TODO: use the access token to see if you can use the isa here
    """
    isa = _get_isa_by_id(isa_id)
    return isa
