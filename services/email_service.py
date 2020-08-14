from app import config
from third_party.sendgrid.sendgrid_client import SendgridEmail
from models.user import User
from models.isa import ISA
from common.constants import (
    FORGOT_PASSWORD_TEMPLATE,
    SEND_CLIENT_ISA_OFFER,
    SEND_CLIENT_ISA_OFFER_LINK,
)


def send_forgot_password_email(user: User, reset_password_link: str) -> None:
    sendgrid_email = SendgridEmail(
        user=user,
        template_id=FORGOT_PASSWORD_TEMPLATE,
        email_data=dict(
            first_name=user.first_name, reset_password_link=reset_password_link,
        ),
    )

    sendgrid_email.send()


def _client_offer_link(isa: ISA) -> str:
    return f"{config.WEB_APP_DOMAIN}/{SEND_CLIENT_ISA_OFFER_LINK}/{isa.id}"


def send_client_isa_offer_email(isa: ISA) -> None:
    client_offer_link = _client_offer_link(isa)
    sendgrid_email = SendgridEmail(
        user=isa.student,
        template_id=SEND_CLIENT_ISA_OFFER,
        email_data=dict(
            first_name=isa.student.first_name, offer_link=client_offer_link,
        ),
    )

    sendgrid_email.send()
