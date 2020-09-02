from app import config
from third_party.sendgrid.sendgrid_client import SendgridEmail
from models.user import User, Coach
from models.company import Company
from models.isa import ISA
from services.token_service import generate_user_token
from common.constants import (
    FORGOT_PASSWORD_TEMPLATE,
    SEND_CLIENT_ISA_OFFER,
    SEND_CLIENT_ISA_OFFER_LINK,
    SEND_COACH_INVITATION_TEMPLATE_ID,
    SEND_COACH_INVITATION_LINK,
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
    token = generate_user_token(isa.student.id)
    return (
        f"{config.WEB_APP_DOMAIN}/{SEND_CLIENT_ISA_OFFER_LINK}/{isa.id}?token={token}"
    )


def _coach_invitation_link(coach: Coach) -> str:
    token = generate_user_token(coach.id)
    return (
        f"{config.WEB_APP_DOMAIN}/{SEND_COACH_INVITATION_LINK}/{coach.id}?token={token}"
    )


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


def send_coach_invitation(coach: Coach, company: Company) -> None:
    coach_invitation_link = _coach_invitation_link(coach)
    sendgrid_email = SendgridEmail(
        user=coach,
        template_id=SEND_COACH_INVITATION_TEMPLATE_ID,
        email_data=dict(
            first_name=coach.first_name,
            invitation_link=coach_invitation_link,
            company_name=company.name,
        ),
    )

    sendgrid_email.send()
