# type: ignore
import pytest
from services.email_service import send_forgot_password_email
from tests.factories import UserFactory


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
