from app import config
from typing import Any, Dict

from enum import Enum
from docusign_esign import EnvelopesApi, EnvelopeDefinition, TemplateRole, ApiClient
from models.user import Coach, Student
from services.user_service import get_user_name

ISA_TEMPLATE_ID = "4652a178-cac7-491a-b03d-bdba57b6f175"


class TemplateRoleType(Enum):
    COMPANY = "Company"
    CLIENT = "Client"


class Docusign:
    def __init__(self) -> None:
        self.account_id = config.DOCUSIGN_ACCOUNT_ID
        self.base_path = config.DOCUSIGN_BASE_PATH
        self.access_token = config.DOCUSIGN_ACCESS_TOKEN
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

        envelope_definition = EnvelopeDefinition(
            status="sent",  # requests that the envelope be created and sent.
            template_id=ISA_TEMPLATE_ID,
        )
        # Create template role elements to connect the signer and cc recipients
        # to the template
        copmany = TemplateRole(
            email=coach.email,
            name=coach.first_name,
            role_name=TemplateRoleType.COMPANY.value,
        )
        # Create a cc template role.
        client = TemplateRole(
            email=student.email,
            name=get_user_name(student),
            role_name=TemplateRoleType.CLIENT.value,
        )

        # Add the TemplateRole objects to the envelope object
        envelope_definition.template_roles = [copmany, client]

        return envelope_definition

    def send_envelope(self, coach: Coach, student: Student) -> Dict[Any, Any]:
        envelope_definition = self.get_envelope_definition(coach=coach, student=student)
        envelope_api = EnvelopesApi(self.api_client)
        results = envelope_api.create_envelope(
            account_id=self.account_id, envelope_definition=envelope_definition
        )
        envelope_id = results.envelope_id
        return {"envelope_id": envelope_id}


docusign_client = Docusign()
