from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
    AuthorizationError,
)
from models.isa import ISA
from typing import Any, Dict, Optional

from typing import Optional
from models.user import Student


def get_isa_by_id(isa_id: int, coach_id: int, student_id: Optional[int] = None) -> ISA:
    isa = _get_isa_by_id(isa_id)
    if isa.coach_id != coach_id and isa.student_id != student_id:
        raise AuthorizationError

    return isa


def _get_isa_by_id(isa_id: int) -> ISA:
    isa = ISA.get_isa_by_id(isa_id)
    if not isa:
        raise ResourceNotFound
    return isa


def create_student_and_isa(schema: Dict[Any, Any]) -> ISA:
    """
    creating student from the dictionary and removing the client payload
    """
    student = Student.create_user(**schema["client"])
    schema.pop("client")
    schema["student_id"] = student.id

    isa = ISA.create_isa(**schema)
    return isa
