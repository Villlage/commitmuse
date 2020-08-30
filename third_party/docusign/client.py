from app import config
from typing import Any, Dict

from enum import Enum
from docusign_esign import EnvelopesApi, EnvelopeDefinition, TemplateRole, ApiClient
from models.user import Coach, Student
from services.user_service import get_user_name
from docusign_esign import (
    EnvelopeDefinition,
    EnvelopesApi,
    RecipientViewRequest,
    Tabs,
    Tabs,
    Text,
)

ISA_TEMPLATE_ID = "4652a178-cac7-491a-b03d-bdba57b6f175"


class TemplateRoleType(Enum):
    COMPANY = "Company"
    CLIENT = "Client"


class Docusign:
    def __init__(self) -> None:
        self.account_id = config.DOCUSIGN_ACCOUNT_ID
        self.base_path = config.DOCUSIGN_BASE_PATH
        self.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjY4MTg1ZmYxLTRlNTEtNGNlOS1hZjFjLTY4OTgxMjIwMzMxNyJ9.eyJUb2tlblR5cGUiOjUsIklzc3VlSW5zdGFudCI6MTU5ODc3NTY2OSwiZXhwIjoxNTk4ODA0NDY5LCJVc2VySWQiOiJiOWQ3NmEyYS1lMzMyLTRhNWQtODU5Mi1jZjcwZjkxOTUxOTgiLCJzaXRlaWQiOjEsInNjcCI6WyJzaWduYXR1cmUiLCJjbGljay5tYW5hZ2UiLCJvcmdhbml6YXRpb25fcmVhZCIsInJvb21fZm9ybXMiLCJncm91cF9yZWFkIiwicGVybWlzc2lvbl9yZWFkIiwidXNlcl9yZWFkIiwidXNlcl93cml0ZSIsImFjY291bnRfcmVhZCIsImRvbWFpbl9yZWFkIiwiaWRlbnRpdHlfcHJvdmlkZXJfcmVhZCIsImR0ci5yb29tcy5yZWFkIiwiZHRyLnJvb21zLndyaXRlIiwiZHRyLmRvY3VtZW50cy5yZWFkIiwiZHRyLmRvY3VtZW50cy53cml0ZSIsImR0ci5wcm9maWxlLnJlYWQiLCJkdHIucHJvZmlsZS53cml0ZSIsImR0ci5jb21wYW55LnJlYWQiLCJkdHIuY29tcGFueS53cml0ZSJdLCJhdWQiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJhenAiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJpc3MiOiJodHRwczovL2FjY291bnQtZC5kb2N1c2lnbi5jb20vIiwic3ViIjoiYjlkNzZhMmEtZTMzMi00YTVkLTg1OTItY2Y3MGY5MTk1MTk4IiwiYW1yIjpbImludGVyYWN0aXZlIl0sImF1dGhfdGltZSI6MTU5ODc3NTY2NiwicHdpZCI6ImIwZDUzYTRjLWZlYWMtNGY2OC04ZTllLWYxODMzODEzZGE0OSJ9.jA3iTbhEHJysp-dQtXgIxvY_dr8l5SSTIcAIiOUXLLdeXJ776dgKXu-MNmNhZdgckjhZ0AqMNfjhs1OJPWZut7v73ab9t6DZWXhybpKEKq0O9YSCbn6CFYLagvnP01-M4JVlDU3pJHNZxv6loPI_lLA1RD-d6ik2w9FaIsxQBhhFaRp0of_jJvpgN5PY7xMRTSxoFwRPEj1t54ZIb_CtOeNDBtopevuKv5ngm9KCHfbqqjJT1Tz72hkZQfYDylr4gHyF1LER-hDTXfSkzB5e3moFrfSSEfgsxNe0mceg5LBs1cMj3lD5IqjNTeUZw1AgdWkYmAxbPgv2guBdjASPgg"
        self.api_client = self._create_api_client()

    def _create_api_client(self) -> ApiClient:
        api_client = ApiClient()
        api_client.host = self.base_path
        api_client.set_default_header("Authorization", "Bearer " + self.access_token)
        return api_client

    def get_envelope_definition(self, coach: Coach, student: Student) -> Any:
        signer_email = "gilad.kahala@gmail.com"
        signer_name = "Gilad Kahala"
        cc_email = "gilad.kahala@gmail.com"
        cc_name = "CC Gilad Kahala"

        envelope_args = {
            "signer_email": signer_email,
            "signer_name": signer_name,
            "cc_email": cc_email,
            "cc_name": cc_name,
            "template_id": ISA_TEMPLATE_ID,
        }

        args = {
            "account_id": self.account_id,
            "base_path": self.base_path,
            "access_token": self.access_token,
            "envelope_args": envelope_args,
        }

        text = Text(tab_label="current_income", value="Jabberywocky!")

        # Add the tabs model (including the SignHere tab) to the signer.
        # The Tabs object wants arrays of the different field/tab types
        # Tabs are set per recipient / signer
        tabs = Tabs(text_tabs=[text])

        # Create template role elements to connect the signer and cc recipients
        # to the template
        copmany = TemplateRole(
            email=coach.email,
            name=coach.first_name,
            role_name=TemplateRoleType.COMPANY.value,
            tabs=tabs,
        )
        # Create a cc template role.
        client = TemplateRole(
            email=student.email,
            name=get_user_name(student),
            role_name=TemplateRoleType.CLIENT.value,
        )

        import pytest

        pytest.set_trace()
        envelope_definition = EnvelopeDefinition(
            status="sent",  # requests that the envelope be created and sent.
            template_id=ISA_TEMPLATE_ID,
            template_roles=[copmany, client],
        )

        return envelope_definition

    def send_envelope(self, coach: Coach, student: Student) -> Dict[Any, Any]:
        envelope_definition = self.get_envelope_definition(coach=coach, student=student)
        envelope_api = EnvelopesApi(self.api_client)
        results = envelope_api.create_envelope(
            account_id=self.account_id, envelope_definition=envelope_definition
        )
        envelope_id = results.envelope_id
        return {"envelope_id": envelope_id}

    def embedded_signing(self, coach: Coach, student: Student) -> Any:
        self.api_client = self._create_api_client()

        envelope_definition = self.get_envelope_definition(coach=coach, student=student)
        envelope_api = EnvelopesApi(self.api_client)
        results = envelope_api.create_envelope(
            account_id=self.account_id, envelope_definition=envelope_definition
        )
        envelope_id = results.envelope_id

        # 3. Create the Recipient View request object
        authentication_method = "None"  # How is this application authenticating
        # the signer? See the "authenticationMethod" definition
        # https://goo.gl/qUhGTm
        recipient_view_request = RecipientViewRequest(
            authentication_method=authentication_method,
            client_user_id=None,
            recipient_id="1",
            return_url="http://commitmuse.herokuapp.com/web",
            user_name=coach.first_name,
            email=coach.email,
        )
        # 4. Obtain the recipient_view_url for the signing ceremony
        # Exceptions will be caught by the calling function
        results = envelope_api.create_recipient_view(
            account_id=self.account_id,
            envelope_id=envelope_id,
            recipient_view_request=recipient_view_request,
        )

        return results
        # return {"envelope_id": envelope_id, "redirect_url": results.url}


docusign_client = Docusign()
