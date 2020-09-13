# type: ignore
import pytest
from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
    AuthorizationError,
)
from tests.factories import CompanyFactory, UserFactory, CoachFactory
from services.company_service import (
    get_company_by_id,
    create_company,
    assign_user_to_company,
    invite_coach_to_company,
)
from models.user import UserRole


class TestCompanyService:
    def test_get_company_by_id(self) -> None:
        created_company = CompanyFactory.create()
        user = UserFactory.create(company=created_company)
        company = get_company_by_id(user=user, company_id=created_company.id,)
        assert company == created_company

    def test_get_company_by_id_not_found(self) -> None:
        UserFactory.create()
        with pytest.raises(ResourceNotFound):
            get_company_by_id(company_id=123, user=123)

    def test_bad_authurization_get_company_by_id(self) -> None:
        created_company = CompanyFactory.create()
        bad_user = UserFactory.create(company=None)
        with pytest.raises(AuthorizationError):
            get_company_by_id(user=bad_user, company_id=created_company.id)

    def test_create_company_and_assign_user(self) -> None:
        arguments = dict(
            number_of_employees_estimate="1-50",
            name="Company Inc.",
            address="250 1st Avenue 4E NY, NY, 10009",
        )
        user = UserFactory.create()
        company = create_company(schema=arguments, user=user)
        assert company
        assert company.name == arguments["name"]
        assert len(company.users) == 1
        assert company.users[0] == user
        assert company.users[0].user_role == UserRole.COMPANY_ADMIN.value

    def test_assign_user_to_company(self) -> None:
        created_company = CompanyFactory.create()
        user = UserFactory.create()
        patched_user = assign_user_to_company(user=user, company_id=created_company.id)

        assert patched_user == user
        assert patched_user.user_role == UserRole.REGULAR.value


class TestCoachInvitation:
    @pytest.fixture()
    def mock_sendgrid_send_email(self, mocker) -> None:
        return mocker.patch(
            "third_party.sendgrid.sendgrid_client.SendgridEmail.send",
            return_value=None,
        )

    def test_invite_coach_to_company(self, mock_sendgrid_send_email) -> None:
        company = CompanyFactory.create()
        user = UserFactory.create(company=company)
        schema = dict(
            first_name="some", last_name="one", user_role=1, email="someone@gmail.com"
        )

        coach = invite_coach_to_company(company_id=company.id, user=user, schema=schema)
        assert coach
        assert coach.company_id == company.id

        mock_sendgrid_send_email.assert_called_once()

    def test_invite_coach_to_company_coach_exists(
        self, mock_sendgrid_send_email
    ) -> None:
        company = CompanyFactory.create()
        user = UserFactory.create(company=company)
        email = "someoneelse@gmail.com"
        coach = CoachFactory.create(email=email)

        schema = dict(first_name="some", last_name="one", user_role=1, email=email)

        coach = invite_coach_to_company(company_id=company.id, user=user, schema=schema)
        assert coach.company_id == company.id
        assert coach.email == email
        mock_sendgrid_send_email.assert_called_once()
