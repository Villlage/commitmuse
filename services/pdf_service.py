import base64
import os
import time

import pdfkit
from flask import jsonify

from third_party.docusign.docusign_client import docusign



# TODO: pdf path to replace with CDN and store in db wrt user
def create_pdf_file():
    timestr = time.strftime("%Y%m%d-%H%M%S")
    pdf = pdfkit.from_file('demo.html' ,'resources/output.pdf')
    return pdf


def send_pdf_document():
    sign_tab = docusign.signer_tab()
    return sign_tab
