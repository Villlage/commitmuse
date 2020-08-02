# type: ignore
import pytest
from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
    AuthorizationError,
)
from tests.factories import ISAFactory
from services.isa_service import get_isa_by_id


class TestISAService:
    def test_get_isa_by_id(self) -> None:
        created_isa = ISAFactory.create()
        isa = get_isa_by_id(
            student_id=created_isa.student_id,
            coach_id=created_isa.coach_id,
            isa_id=created_isa.id,
        )
        assert isa == created_isa

    def test_get_isa_by_id_not_found(self) -> None:
        with pytest.raises(ResourceNotFound):
            get_isa_by_id(isa_id=123, coach_id=123)

    @pytest.mark.skip(
        reason="need to change it to include user_id as well in the function"
    )
    def test_bad_authurization_get_isa_by_id(self) -> None:
        created_isa = ISAFactory.create()
        bad_coach_id = created_isa.coach_id + 1
        with pytest.raises(AuthorizationError):
            get_isa_by_id(coach_id=bad_coach_id, isa_id=created_isa.id)

    def get_isa_by_id_with_access_token(self):
        created_isa = ISAFactory.create()
        isa = get_isa_by_id(isa_id=created_isa.id, access_token="123")
        assert created_isa == isa
