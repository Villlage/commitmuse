import base64
import os

from docusign_esign import (ApiClient, Document, EnvelopeDefinition,
                            EnvelopesApi, Recipients, RecipientViewRequest,
                            Signer, SignHere, Tabs)
from flask import url_for

from app import config
from third_party.docusign.docusign_constants import (FILE_NAME_PATH,
                                                     SIGNER_EMAIL, SIGNER_NAME)


class Docusign(object):

    
    def create_component_envelope(self):
        """
        Create the component objects for the envelope definition...
        
        """
        with open(os.path.join(config.APP_PATH, FILE_NAME_PATH), "rb") as file:
            content_bytes = file.read()
        base64_file_content = base64.b64encode(content_bytes).decode('ascii')

        document = Document( 
            document_base64 = base64_file_content, 
            name = 'Example document',
            file_extension = 'pdf', 
            document_id = 1 
        )
        return document


   
    def create_signer_model(self):
        """
        Create the signer recipient model 
        
        """
        signer = Signer( # The signer
            email = SIGNER_EMAIL, name = SIGNER_NAME, recipient_id = "1", routing_order = "1")
        return signer


     
    def create_sign_tab(self):
        """
        Create a sign_here tab (field on the document)
        
        """
        sign_here = SignHere( # DocuSign SignHere field/tab
            document_id = '1', page_number = '1', recipient_id = '1', tab_label = 'SignHereTab',
            x_position = '195', y_position = '147')

        return sign_here


    def create_envelop_definition(self):
        envelop_definition = EnvelopeDefinition(
            email_subject = "ISA Document",
            documents = [self.create_component_envelope()], # The order in the docs array determines the order in the envelope
            recipients = Recipients(signers = [self.create_signer_model()]), # The Recipients object wants arrays for each recipient type
            status = "sent" # requests that the envelope be created and sent.
        )
        return envelop_definition


    def verify_client(self):
        api_client = ApiClient()
        api_client.host = config.BASE_PATH
        api_client.set_default_header("Authorization", "Bearer " + config.ACCESS_TOKEN)
        # TODO: move to services -verify_token
        envelope_api = EnvelopesApi(api_client)
        results = envelope_api.create_envelope(config.ACCOUNT_ID, envelope_definition=self.create_envelop_definition())
        envelope_id = results.envelope_id
        return envelope_api,envelope_id


    def create_recipient_request(self):
        from controller.pdf_routes import send_document_for_signing
        envelope_args = {
                "signer_email": SIGNER_EMAIL,
                "signer_name":  SIGNER_NAME,
                "signer_client_id": 'sumitcstpl@gmail.com',
                "ds_return_url": url_for(".send_document_for_signing", _external=True),
            }
        recipient_view_request = RecipientViewRequest(
        authentication_method=config.AUTHENTICATION_METHOD,
        client_user_id=envelope_args["signer_client_id"],
        recipient_id="1",
        return_url=envelope_args["ds_return_url"],
        user_name=envelope_args["signer_name"],
        email=envelope_args["signer_email"]
    )
        return recipient_view_request


    def signer_tab(self):
        signer = self.create_signer_model()
        signer.tabs = Tabs(sign_here_tabs = [self.create_sign_tab()]) # The Tabs object wants arrays of the different field/tab types
        values = self.verify_client()
        envelope_api = values[0]
        envelope_id = values[1]
        recipient_view_request = self.create_recipient_request()

        return envelope_id
   
docusign = Docusign()
