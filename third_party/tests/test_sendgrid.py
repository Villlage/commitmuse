# type: ignore
from datetime import datetime

from tests.factories import UserFactory
from third_party.sendgrid.sendgrid_client import SendgridEmail


class TestSendGrid:
    def test_create_sendgrid_email(self) -> None:
        user = UserFactory.create()
        template_id = "123"
        email_data = dict(last_name=user.last_name, something="something")
        sendgrid_email = SendgridEmail(
            user=user, template_id=template_id, email_data=email_data
        )

        assert sendgrid_email
        assert sendgrid_email.mail.personalizations
        assert (
            sendgrid_email.mail.personalizations[0].dynamic_template_data["first_name"]
            == user.first_name
        )
        assert (
            sendgrid_email.mail.personalizations[0].dynamic_template_data["last_name"]
            == user.last_name
        )
        assert (
            sendgrid_email.mail.personalizations[0].dynamic_template_data["something"]
            == "something"
        )
        assert sendgrid_email.mail.template_id.template_id == template_id

    def test_get_date_string_representation(self) -> None:
        test_date = datetime(2019, 5, 20, 12, 34)
        str_date = SendgridEmail._get_date_string_representation(test_date)
        assert str_date == "May 20th, 2019"
