from app import config

# DocuSign configuration settings

INTEGRATION_KEY = config.DOCUSIGN_CLIENT_ID
IMPERSONATED_USER_ID = config.IMPERSONATED_USER_ID
AUTHORIZATION_SERVER = config.AUTHORIZATION_SERVER


SIGNER_EMAIL = "gilad.kahala@gmail.com"
SIGNER_NAME = "Gilad Kahala"
SECRET_KEY = "e4df848e-b88d-4731-a758-85765ed814be"

DS_PAYMENT_GATEWAY_ID = None


DS_CONFIG = {
    "ds_client_id": f"{INTEGRATION_KEY}",  # The 's DocuSign integration key
    "ds_client_secret": f"{SECRET_KEY}",  # The app's DocuSign integration key's secret
    "signer_email": f"{SIGNER_EMAIL}",
    "signer_name": f"{SIGNER_NAME}",
    "app_url": "http://localhost:5000",  # The url of the application. Eg http://localhost:5000
    # NOTE: You must add a Redirect URI of appUrl/ds/callback to your Integration Key.
    #       Example: http://localhost:5000/ds/callback
    # "authorization_server": "https://account-d.docusign.com",
    "authorization_server": AUTHORIZATION_SERVER,
    "allow_silent_authentication": True,  # a user can be silently authenticated if they have an
    # active login session on another tab of the same browser
    "target_account_id": None,  # Set if you want a specific DocuSign AccountId,
    # If None, the user's default account will be used.
    "demo_doc_path": "demo_documents",
    "doc_salary_docx": "World_Wide_Corp_salary.docx",
    "doc_docx": "World_Wide_Corp_Battle_Plan_Trafalgar.docx",
    "doc_pdf": "World_Wide_Corp_lorem.pdf",
    # Payment gateway information is optional
    "gateway_account_id": f"{DS_PAYMENT_GATEWAY_ID}",
    "gateway_name": "stripe",
    "gateway_display_name": "Stripe",
    "github_example_url": "https://github.com/docusign/code-examples-python/tree/master/app/",
    "documentation": "",  # Use an empty string to indicate no documentation path.
}

DS_JWT = {
    "ds_client_id": f"{INTEGRATION_KEY}",
    "ds_impersonated_user_id": f"{IMPERSONATED_USER_ID}",  # The id of the user.
    # Create a new file in your repo source folder named private.key then copy and paste your RSA private key there and save it.
    "private_key_file": "./private.key",
    "authorization_server": "account.docusign.com",
}
