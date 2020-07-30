import base64
import os
import time
import pdfkit
from flask import render_template
from docusign_esign import (ApiClient, Document, EnvelopeDefinition,
                            EnvelopesApi, Recipients, RecipientViewRequest,
                            Signer, SignHere)
from flask import url_for

from config import access_token, account_id, authentication_method, base_path

# To be replaced with dynamic data
signer_name = "sumit chawla"
signer_email = "sumitcstpl@gmail.com"
APP_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
file_name_path = 'resources/output.pdf'


def create_pdf_file():
    timestr = time.strftime("%Y%m%d-%H%M%S")
    # TODO: pdf path to replace with CDN and store in db wrt user
    pdf = pdfkit.from_file('demo.html' ,'resources/output.pdf')
    return pdf



# Create the component objects for the envelope definition...
def create_component_envelop():
    with open(os.path.join(APP_PATH, file_name_path), "rb") as file:
        content_bytes = file.read()
    base64_file_content = base64.b64encode(content_bytes).decode('ascii')

    document = Document( # create the DocuSign document object 
        document_base64 = base64_file_content, 
        name = 'Example document', # can be different from actual file name
        file_extension = 'pdf', # many different document types are accepted
        document_id = 1 # a label used to reference the doc
    )
    return document

# Create the signer recipient model 
def create_signer_model():
    signer = Signer( # The signer
        email = signer_email, name = signer_name, recipient_id = "1", routing_order = "1")
    return signer

# Create a sign_here tab (field on the document)
def create_sign_tab():
    sign_here = SignHere( # DocuSign SignHere field/tab
        document_id = '1', page_number = '1', recipient_id = '1', tab_label = 'SignHereTab',
        x_position = '195', y_position = '147')

    return sign_here


def create_envelop_definition():
    envelop_definition = EnvelopeDefinition(
        email_subject = "Please sign this document",
        documents = [create_component_envelop()], # The order in the docs array determines the order in the envelope
        recipients = Recipients(signers = [create_signer_model()]), # The Recipients object wants arrays for each recipient type
        status = "sent" # requests that the envelope be created and sent.
    )
    return envelop_definition
