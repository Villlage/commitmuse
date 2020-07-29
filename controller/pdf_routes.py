import base64
import os
import time

import pdfkit
from docusign_esign import (ApiClient, Document, EnvelopeDefinition,
                            EnvelopesApi, Recipients, RecipientViewRequest,
                            Signer, SignHere, Tabs)
from flask import render_template, url_for

from app import app
from config import access_token, account_id, authentication_method, base_path
from services.pdf_service import (create_component_envelop,
                                  create_envelop_definition, create_sign_tab,
                                  create_signer_model, signer_email,
                                  signer_name)

# Recipient Information:

@app.route("/pdf/generate", methods=["GET"])
def create_pdf():
    timestr = time.strftime("%Y%m%d-%H%M%S")
    # TODO: pdf path to replace with CDN and store in db wrt user
    pdf = pdfkit.from_file('demo.html' ,'resources/output.pdf')
    return render_template('index.html')


@app.route("/pdf/send", methods=["POST"])
def send_document_for_signing():
    """
    Sends the document <file_name> to be signed by <signer_name> via <signer_email>
    """


    envelope_args = {
            "signer_email": signer_email,
            "signer_name": signer_name,
            "signer_client_id": 'sumitcstpl@gmail.com',
            "ds_return_url": url_for(".send_document_for_signing", _external=True),
        }
    document = create_component_envelop()
    
    # call a signer model (field on the document)
    signer = create_signer_model()

    # call a sign_here tab (field on the document)
    sign_here = create_sign_tab()

    # Add the tabs model (including the sign_here tab) to the signer
    signer.tabs = Tabs(sign_here_tabs = [sign_here]) # The Tabs object wants arrays of the different field/tab types

    api_client = ApiClient()
    api_client.host = base_path
    api_client.set_default_header("Authorization", "Bearer " + access_token)
    # TODO: move to services -verify_token
    envelope_api = EnvelopesApi(api_client)
    results = envelope_api.create_envelope(account_id, envelope_definition=create_envelop_definition())
    envelope_id = results.envelope_id

    # 3. Create the Recipient View request object
    recipient_view_request = RecipientViewRequest(
        authentication_method=authentication_method,
        client_user_id=envelope_args["signer_client_id"],
        recipient_id="1",
        return_url=envelope_args["ds_return_url"],
        user_name=envelope_args["signer_name"],
        email=envelope_args["signer_email"]
    )
    # 4. Obtain the recipient_view_url for the signing ceremony
    # Exceptions will be caught by the calling function
    results = envelope_api.create_recipient_view(
        account_id=account_id,
        envelope_id=envelope_id,
        recipient_view_request=recipient_view_request
    )

    return {"envelope_id": envelope_id, "redirect_url": results.url}
