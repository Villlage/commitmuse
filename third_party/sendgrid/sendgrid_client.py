from sendgrid.helpers.mail import Mail, Personalization, Email
from sendgrid import SendGridAPIClient

from datadog import statsd

from typing import Dict, Any
import copy
from app import config, logger, is_development
from models.user import User
from decimal import Decimal
from datetime import datetime
import arrow

sendgrid_client = SendGridAPIClient(api_key=config.SENDGRID_API_KEY)

FROM_EMAIL = "hello@commitmuse.com"


class SendgridEmail:
    def __init__(self, user: User, template_id: str, email_data: Dict[Any, Any]):
        self.mail = Mail()
        self.mail.from_email = FROM_EMAIL
        self.mail.template_id = template_id

        # email data
        self.email_data = copy.copy(email_data)
        self._parse_email_data()
        self._add_personalization(user)

    def _parse_email_data(self) -> None:
        for key in self.email_data:
            if type(self.email_data[key]) == Decimal:
                self.email_data[key] = float(self.email_data[key])
            elif type(self.email_data[key]) == datetime:
                self.email_data[key] = SendgridEmail._get_date_string_representation(
                    self.email_data[key]
                )

    def _add_personalization(self, user: User) -> None:
        """
        add personalization to an email
        """
        personalization = Personalization()
        personalization.add_to(Email(user.email))

        # add first name if there isn't one
        if not "first_name" in self.email_data:
            self.email_data["first_name"] = user.first_name

        personalization.dynamic_template_data = self.email_data
        self.mail.add_personalization(personalization)

    @classmethod
    def _get_date_string_representation(cls, dt: datetime) -> str:
        arrow_datetime = arrow.get(dt)
        date_str = arrow_datetime.format("MMMM Do, YYYY")  # type: str
        return date_str

    def send(self) -> None:
        if is_development():
            logger.debug("not sending email")
            return None

        try:
            sendgrid_client.client.mail.send.post(request_body=self.mail.get())
            statsd.increment("sendgrid.send_email.success", tags=["sendgrid"])
        except Exception as error:
            logger.error(error)
            statsd.increment("sendgrid.send_email.error", tags=["sendgrid"])
