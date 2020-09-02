# type: ignore
import pytest
from services.email_service import (
    send_forgot_password_email,
    send_client_isa_offer_email,
    _client_offer_link,
    send_coach_invitation,
    _coach_invitation_link,
)
from tests.factories import UserFactory, ISAFactory, CoachFactory, CompanyFactory
from services.token_service import generate_user_token


class TestEmails:
    @pytest.fixture()
    def mock_sendgrid_send_email(self, mocker) -> None:
        return mocker.patch(
            "third_party.sendgrid.sendgrid_client.SendgridEmail.send",
            return_value=None,
        )

    def test_send_forgot_password_email(self, mock_sendgrid_send_email) -> None:
        user = UserFactory.create()
        reset_password_link = "hello"
        mail = send_forgot_password_email(
            user=user, reset_password_link=reset_password_link
        )
        mock_sendgrid_send_email.assert_called_once()

    def test_send_client_isa_offer_email(self, mock_sendgrid_send_email) -> None:
        isa = ISAFactory.create()
        send_client_isa_offer_email(isa=isa)
        mock_sendgrid_send_email.assert_called_once()

    def test_send_client_isa_offer_link(self) -> None:
        isa = ISAFactory.create()
        client_offer_link = _client_offer_link(isa)
        token = generate_user_token(isa.student.id)
        assert (
            client_offer_link
            == f"http://localhost:5000/web/client/isa-offer/{isa.id}?token={token}"
        )

    def test_coach_invitation_link(self):
        coach = CoachFactory.create()
        token = generate_user_token(coach.id)
        coach_invitation_link = _coach_invitation_link(coach)

        assert (
            coach_invitation_link
            == f"http://localhost:5000/web/coach/invitation/{coach.id}?token={token}"
        )

    def test_send_coach_invitation(self, mock_sendgrid_send_email):
        company = CompanyFactory.create()
        coach = CoachFactory.create()
        send_coach_invitation(coach=coach, company=company)
        mock_sendgrid_send_email.assert_called_once()
