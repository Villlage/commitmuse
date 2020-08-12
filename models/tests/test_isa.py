from models.isa import ISA
from tests.factories import CoachFactory, ISAFactory, StudentFactory


class TestISA:
    def test_get_isa_by_id(self) -> None:
        isa = ISAFactory.create()
        res = isa.get_isa_by_id(isa.id)
        assert isa == res

    def test_create_isa(self) -> None:
        student = StudentFactory.create()
        coach = CoachFactory.create()

        arguments = dict(
            current_income=100000,
            percentage=17.0,
            cap=10000,
            time_to_be_paid=24,
            description="becoming a product manager",
            student_id=student.id,
            coach_id=coach.id,
            cancellation_period_weeks=2,
            industry_field="Information Technology",
            program_duration_weeks=10,
        )

        isa = ISA.create_isa(**arguments)

        assert isa
        assert isa.current_income == arguments["current_income"]
        assert isa.percentage == arguments["percentage"]
        assert isa.coach == coach
        assert isa.student == student

    def test_update(self) -> None:
        isa = ISAFactory.create()
        percentage = 16.0
        update_args = dict(percentage=percentage)
        isa = isa.update_isa(**update_args)
        assert isa
        assert isa.percentage == percentage
