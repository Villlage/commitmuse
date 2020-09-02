# type: ignore
from app import app
from datetime import datetime, timedelta

from flask import flash, jsonify, redirect, request, session, url_for

from third_party.docusign.docusign import DSClient
from third_party.docusign.ds_config import DS_CONFIG

base_uri_suffix = "/restapi"


@app.route("/ds/login", methods=["GET"])
def ds_login():
    isa_id = request.args.get("isa_id")
    session["isa_id"] = isa_id
    session["auth_type"] = "jwt"
    return DSClient.login("jwt")


@app.route("/ds/gilad", methods=["GET", "POST"])
def ds_stuff():
    return jsonify("hello")


@app.route("/ds/callback")
def ds_callback():
    """
    Save the token information in session.
    Call api to get user's information if it doesn't present
    """

    # Save the redirect eg if present
    redirect_url = session.pop("eg", None)
    resp = DSClient.get_token(session["auth_type"])

    # app.logger.info("Authenticated with DocuSign.")
    session["ds_access_token"] = resp["access_token"]
    session["ds_refresh_token"] = resp["refresh_token"]
    session["ds_expiration"] = datetime.utcnow() + timedelta(
        seconds=int(resp["expires_in"])
    )

    if not session.get("ds_account_id"):
        flash("You have authenticated with DocuSign.")
        # Request to API to get the user information
        response = DSClient.get_user(session["ds_access_token"])
        session["ds_user_name"] = response["name"]
        session["ds_user_email"] = response["email"]
        accounts = response["accounts"]
        # Find the account...
        target_account_id = DS_CONFIG["target_account_id"]
        if target_account_id:
            account = next(
                (a for a in accounts if a["account_id"] == target_account_id), None
            )
            if not account:
                # Panic! The user does not have the targeted account. They should not log in!
                raise Exception("No access to target account")
        else:  # get the default account
            account = next((a for a in accounts if a["is_default"]), None)
            if not account:
                # Panic! Every user should always have a default account
                raise Exception("No default account")

        # Save the account information
        session["ds_account_id"] = account["account_id"]
        session["ds_account_name"] = account["account_name"]
        session["ds_base_path"] = account["base_uri"] + base_uri_suffix

    if not redirect_url:
        isa_id = session["isa_id"]
        redirect_url = url_for(f"/web/company/isas/contract/{isa_id}")
    return redirect(redirect_url)
