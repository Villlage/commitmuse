import uuid
from app import config
from typing import Any, Dict

from enum import Enum
import requests
from flask import current_app as app, url_for, request
from flask_oauthlib.client import OAuth

from docusign_esign import EnvelopesApi, EnvelopeDefinition, TemplateRole, ApiClient
from models.user import Coach, Student
from services.user_service import get_user_name

ISA_TEMPLATE_ID = "4652a178-cac7-491a-b03d-bdba57b6f175"


class TemplateRoleType(Enum):
    COMPANY = "Company"
    CLIENT = "Client"


class Docusign:

    ds_app = None
    base_path = config.DOCUSIGN_BASE_PATH
    account_id = config.DOCUSIGN_ACCOUNT_ID
    access_token = None

    # def __init__(self):
    #     self.ds_app = None
    #     self.account_id = config.DOCUSIGN_ACCOUNT_ID
    #     self.base_path = config.DOCUSIGN_BASE_PATH
    #     self.access_token = self._auth_code_grant()
    #     # self.api_client = self._create_api_client()

    @classmethod
    def _init(cls, auth_type):
        cls._auth_code_grant()

    @classmethod
    def _auth_code_grant(cls):
        """Authorize with the Authorization Code Grant - OAuth 2.0 flow"""
        oauth = OAuth(app)
        request_token_params = {
            "scope": "signature",
            "state": lambda: uuid.uuid4().hex.upper()
        }
        
        cls.ds_app = oauth.remote_app(
            "docusign",
            consumer_key=config.DOCUSIGN_CLIENT_ID,
            consumer_secret=config.DOCUSIGN_CLIENT_SECRET,
            access_token_url="https://account-d.docusign.com" + "/oauth/token",
            authorize_url="https://account-d.docusign.com" + "/oauth/auth",
            request_token_params=request_token_params,
            base_url=None,
            request_token_url=None,
            access_token_method="POST"
        )

    @classmethod
    def destroy(cls):
        cls.ds_app = None

    @classmethod
    def login(cls, auth_type):
        with app.test_request_context():
            callback_url = url_for("ds_callback", _external=True)
            if app.config.get("ENV") == "development":
                callback_url = callback_url.replace('://localhost/', '://localhost:%d/' % (config.PORT))

            return cls.get("code_grant").authorize(callback=callback_url)


    @classmethod
    def get_token(cls, auth_type):
        resp = None
        resp = cls.get("code_grant").authorized_response()

        if resp is None or resp.get("access_token") is None:
            return "Access denied: reason=%s error=%s resp=%s" % (
                request.args["error"],
                request.args["error_description"],
                resp
            )
        cls.access_token = resp.get("access_token")
        return resp

    @classmethod
    def get_user(cls, access_token):
        """Make request to the API to get the user information"""
        # Determine user, account_id, base_url by calling OAuth::getUserInfo
        # See https://developers.docusign.com/esign-rest-api/guides/authentication/user-info-endpoints
        url = config.AUTHORIZATION_SERVER + "/oauth/userinfo"
        auth = {"Authorization": "Bearer " + access_token}
        response = requests.get(url, headers=auth).json()

        return response

    @classmethod
    def get(cls, auth_type):
        if not cls.ds_app:
            cls._init(auth_type)
        return cls.ds_app


    @classmethod
    def _create_api_client(cls):
        api_client = ApiClient()
        api_client.host = cls.base_path
        api_client.set_default_header("Authorization", "Bearer " + cls.access_token)
        return api_client

    @classmethod
    def get_envelope_definition(cls, coach: Coach, student: Student) -> Any:
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
            "account_id": cls.account_id,
            "base_path": cls.base_path,
            "access_token": cls.access_token,
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
