from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
    AuthorizationError,
)
from models.isa import ISA

from typing import Optional


def get_isa_by_id(isa_id: int, coach_id: int, student_id: Optional[int] = None) -> ISA:
    isa = _get_isa_by_id(isa_id)
    if isa.coach_id != coach_id or isa.student_id != student_id:
        raise AuthorizationError

    return isa


def _get_isa_by_id(isa_id: int) -> ISA:
    isa = ISA.get_isa_by_id(isa_id)
    if not isa:
        raise ResourceNotFound
    return isa
