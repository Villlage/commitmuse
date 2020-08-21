from flask import request, jsonify
from typing import Tuple
from werkzeug import Response
from app import app
from services.user_service import create_user, get_user, reset_password
from serializers.user_serializers import (
    login_schema,
    user_schema,
    reset_password_schema,
    update_user_schema,
)
from flask_login import login_user, logout_user, current_user
from controller.common import login_required, get_current_user
from common.constants import INDUSTRY_FIELDS


@app.route("/login", methods=["POST"])
def login() -> Tuple[Response, int]:
    """
    login a user with email and password
    """
    schema = login_schema.load(request.json)
    user = get_user(email=schema["email"], password=schema["password"])
    login_user(user)
    result = user_schema.dump(user)
    return jsonify(result), 200


@app.route("/check-auth", methods=["GET"])
def check_auth() -> Tuple[Response, int]:
    return jsonify(current_user.is_authenticated), 200


@app.route("/user", methods=["GET", "PATCH"])
@login_required
def user() -> Tuple[Response, int]:
    user = get_current_user()

    if request.method == "PATCH":
        schema = update_user_schema.load(request.json)
        user = user.update_user(attributes=schema)

    result = user_schema.dump(user)

    return jsonify(result), 200


@app.route("/register", methods=["POST"])
def register() -> Tuple[Response, int]:
    """
    register a user with an email and a password
    """
    schema = login_schema.load(request.json)
    user = create_user(schema)
    login_user(user)

    return jsonify("user registered successfully"), 200


@app.route("/logout", methods=["GET", "POST"])
@login_required
def logout() -> Tuple[Response, int]:
    """
    logout a user
    """
    logout_user()
    return jsonify("logged out user successfully"), 200


@app.route("/users/reset-password", methods=["PATCH", "GET"])
def reset_user_password() -> Tuple[Response, int]:
    schema = reset_password_schema.load(request.json)
    user = reset_password(token=schema["token"], password=schema["password"])
    login_user(user)
    result = user_schema.dump(user)

    return jsonify(result), 200


@app.route("/industry-fields", methods=["GET"])
def industry_fields() -> Tuple[Response, int]:
    return jsonify(INDUSTRY_FIELDS), 200


@app.route("/ds", methods=["GET"])
def ds() -> Tuple[Response, int]:
    from third_party.docusign.client import Docusign

    Docusign(request)
    return jsonify(), 200


@app.route("/ds/callback")
def ds_callback():
    """
    copied from Docusign Examples

    Save the token information in session.
    Call api to get user's information if it doesn't present
    """

    # Save the redirect eg if present
    session.pop("eg", None)
    print("hello")
    # resp = DSClient.get_token(session["auth_type"])

    # # app.logger.info("Authenticated with DocuSign.")
    # session["ds_access_token"] = resp["access_token"]
    # session["ds_refresh_token"] = resp["refresh_token"]
    # session["ds_expiration"] = datetime.utcnow() + timedelta(seconds=int(resp["expires_in"]))

    # if not session.get("ds_account_id"):
    #     flash("You have authenticated with DocuSign.")
    #     # Request to API to get the user information
    #     response = DSClient.get_user(session["ds_access_token"])
    #     session["ds_user_name"] = response["name"]
    #     session["ds_user_email"] = response["email"]
    #     accounts = response["accounts"]
    #     # Find the account...
    #     target_account_id = DS_CONFIG["target_account_id"]
    #     if target_account_id:
    #         account = next((a for a in accounts if a["account_id"] == target_account_id), None)
    #         if not account:
    #             # Panic! The user does not have the targeted account. They should not log in!
    #             raise Exception("No access to target account")
    #     else:  # get the default account
    #         account = next((a for a in accounts if a["is_default"]), None)
    #         if not account:
    #             # Panic! Every user should always have a default account
    #             raise Exception("No default account")

    #     # Save the account information
    #     session["ds_account_id"] = account["account_id"]
    #     session["ds_account_name"] = account["account_name"]
    #     session["ds_base_path"] = account["base_uri"] + base_uri_suffix

    # if not redirect_url:
    #     redirect_url = url_for("core.index")
    # return redirect(redirect_url)
