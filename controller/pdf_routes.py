import base64
import os

from docusign_esign import (ApiClient, Document, EnvelopeDefinition,
                            EnvelopesApi, Recipients, RecipientViewRequest,
                            Signer, SignHere, Tabs)
from flask import jsonify, render_template, url_for
from werkzeug import Response

from app import app
from services.pdf_service import create_pdf_file, send_pdf_document
from third_party.docusign.docusign_client import Docusign
from typing import Tuple

@app.route("/pdf/generate", methods=["GET"])
def create_pdf() -> Tuple[Response, int]:
    """
    Take html file as input and generates pdf

    """
    created = create_pdf_file()
    if created:
        return jsonify("Document created successfully"), 200
    else:
        return jsonify("Please try after some time"), 500


@app.route("/pdf/send", methods=["POST"])
def send_document_for_signing() -> Tuple[Response, int]:
    """
    Sends the document <file_name> to be signed by <signer_name> via <signer_email>
    """

    result = send_pdf_document()
    return jsonify(result), 200
