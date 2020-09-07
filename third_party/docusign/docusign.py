# type: ignore
from os import path
from app import config

import requests
from flask import redirect, request, url_for
from docusign_esign import ApiClient
from docusign_esign.client.api_exception import ApiException


class DSClient:
    ds_app = None

    @classmethod
    def _init(cls, auth_type):
        if auth_type == "jwt":
            cls._jwt_auth()
        else:
            print("not jwt?")

    @classmethod
    def _jwt_auth(cls):
        """JSON Web Token authorization"""
        api_client = ApiClient()
        api_client.set_base_path(config.AUTHORIZATION_SERVER)

        private_key = cls._get_private_key().encode("ascii").decode("utf-8")

        try:
            cls.ds_app = api_client.request_jwt_user_token(
                client_id=config.DOCUSIGN_CLIENT_ID,
                user_id=config.IMPERSONATED_USER_ID,
                oauth_host_name=config.AUTHORIZATION_SERVER,
                private_key_bytes=private_key,
                expires_in=3600,
            )

            return redirect(url_for("ds_callback"))

        except ApiException as err:
            body = err.body.decode("utf8")

            # Grand explicit consent for the application
            if "consent_required" in body:
                consent_scopes = "signature%20impersonation"
                redirect_uri = config.WEB_APP_SERVER + url_for("ds_callback")
                consent_url = (
                    f"{config.AUTHORIZATION_SERVER}/oauth/auth?response_type=code&"
                    f"scope={consent_scopes}&client_id={config.DOCUSIGN_CLIENT_ID}&redirect_uri={redirect_uri}"
                )
                return redirect(consent_url)
            else:
                print("error")

    @classmethod
    def destroy(cls):
        cls.ds_app = None

    @staticmethod
    def _get_private_key():
        """
        Check that the private key present in the file and if it is, get it from the file.
        In the opposite way get it from config variable.
        """
        private_key_file = path.abspath(config.PRIVATE_KEY_LOCATION)
        private_key = None

        if path.isfile(private_key_file):
            with open(private_key_file) as private_key_file:
                private_key = private_key_file.read()

        return private_key

    @classmethod
    def login(cls, auth_type):
        if auth_type == "code_grant":
            return cls.get(auth_type).authorize(
                callback=url_for("ds_callback", _external=True)
            )
        elif auth_type == "jwt":
            return cls._jwt_auth()

    @classmethod
    def get_token(cls, auth_type):
        resp = None
        if auth_type == "code_grant":
            resp = cls.get(auth_type).authorized_response()
        elif auth_type == "jwt":
            resp = cls.get(auth_type).to_dict()

        if resp is None or resp.get("access_token") is None:
            return "Access denied: reason=%s error=%s resp=%s" % (
                request.args["error"],
                request.args["error_description"],
                resp,
            )

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
