from third_party.sendgrid.sendgrid_client import SendgridEmail
from models.user import User
from common.constants import FORGOT_PASSWORD_TEMPLATE


def send_forgot_password_email(user: User, reset_password_link: str) -> None:
    sendgrid_email = SendgridEmail(
        user=user,
        template_id=FORGOT_PASSWORD_TEMPLATE,
        email_data=dict(
            first_name=user.first_name, reset_password_link=reset_password_link,
        ),
    )

    sendgrid_email.send()
