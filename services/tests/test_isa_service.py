# type: ignore
import pytest
from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
    AuthorizationError,
)
from tests.factories import ISAFactory, StudentFactory, CoachFactory
from services.isa_service import get_isa_by_id, create_student_and_isa


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

    def test_create_student_and_isa_student_already_exists(self):
        email = "something@gmail.com"
        user = StudentFactory.create(email=email)
        coach = CoachFactory.create(email="coach@gmail.com")
        schema = dict(
            current_income=100000,
            percentage=17.0,
            cap=10000,
            time_to_be_paid=24,
            description="becoming a product manager",
            coach_id=coach.id,
            cancellation_period_weeks=2,
            industry_field="Information technology",
            program_duration_weeks=4,
            client=dict(email=email, first_name="client", last_name="student"),
        )
        isa = create_student_and_isa(schema)
        assert isa
        assert isa.student
        assert isa.student.email == email
