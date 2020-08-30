# ds_config.py
#
# DocuSign configuration settings

INTEGRATION_KEY = "4ecc3248-c115-4782-bbb3-776260404d09"
INTEGRATION_KEY_PRODUCTION = "841c2045-208d-423d-ac21-c5e5883de495"
# INTEGRATION_KEY = INTEGRATION_KEY_PRODUCTION


SIGNER_EMAIL = "gilad.kahala@gmail.com"
SIGNER_NAME = "Gilad Kahala"

IMPERSONATED_USER_ID = "b9d76a2a-e332-4a5d-8592-cf70f9195198"
SECRET_KEY = "e4df848e-b88d-4731-a758-85765ed814be"
DS_PAYMENT_GATEWAY_ID = None

# public key
"""
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtWzckRHBj5LnSV9ife+Y
Dt84cfnBqvVB+EXBpRpCBFMBI9IQwIt1O1+gBEy8uvYfDCr4xHjEzOApM6VJPs5G
M57RYQt7swVc1ORXqQ3omNQo7ARyNx4qcQUPr/7/K2DTj1vcRAoRyfWZyzdgYQbx
HhHJj58qCS7yL3VRzymZHFXvilcfDoTdy9YX0EdnwDhGwrD7B53aeyhsBPb9bpIM
VPwfDEfW0zTdkZ6Ns/J9wWjf1CNTpQr9S9ObxlXyeSmHP1HVBJITveVg/W7Pbpku
Y20nl6PcFydyT6q0uKFr/1Ph2DK9SVBdwLwNm+65Cp1yTeGVTbg0ijZ3/LzS+uBY
+wIDAQAB
-----END PUBLIC KEY-----
"""


# private key
"""
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAtWzckRHBj5LnSV9ife+YDt84cfnBqvVB+EXBpRpCBFMBI9IQ
wIt1O1+gBEy8uvYfDCr4xHjEzOApM6VJPs5GM57RYQt7swVc1ORXqQ3omNQo7ARy
Nx4qcQUPr/7/K2DTj1vcRAoRyfWZyzdgYQbxHhHJj58qCS7yL3VRzymZHFXvilcf
DoTdy9YX0EdnwDhGwrD7B53aeyhsBPb9bpIMVPwfDEfW0zTdkZ6Ns/J9wWjf1CNT
pQr9S9ObxlXyeSmHP1HVBJITveVg/W7PbpkuY20nl6PcFydyT6q0uKFr/1Ph2DK9
SVBdwLwNm+65Cp1yTeGVTbg0ijZ3/LzS+uBY+wIDAQABAoIBABZhN718Ij4SvLh+
rV35ne6ftzfKu7WEtumTDqB44mc5fKzYLzwr4n87fDgWOzsY50WPUMvzqzCBVQkg
54MkMOFnQvl5+tK046RYspORD/3iQKtfSl4642NjthwGFEtb5ge2KNq1H0f5evTo
Ki8Yix/OyT1lQJXiFk/9DzrDLTb4Zsg5Iu+ihFB2jrvSQ+NKlNc9r9y7609AAS9h
LmJpdpVqLcFW7u+42SDtvf4CAr/4ar89xNWB4kNRmiWyIYDvWyOoYFullS8D0MWX
i9BCa4n5bjsyPsZNODAwBTWki2PPe578hWWPXBYdvscpndMEoCkZvaKEZcTENPgY
MgxYoHECgYEA653iKuwYTzRVImoA1Fmmz8OCOoWuVe22mUO1dA9HUPQ0QA6D7QgM
OQgy8sjVmkKCIsbABBELB2COSlGusHEu9aipoc71OlCy45rWalXxQHVNDFy5Z/Ue
sunIqsJL4+8SaeE8Ruk0yTFMi8PWmayCvvkAtr16QpC9ERcVJSvRvUkCgYEAxR7R
uFBQq9dpAI4cneK6HrpIChjU+DaTBv3wG/UT6vybZVLs7u82Vnnlvn99bOgMg79Q
f65NYZPgWgRotf2bdlWDj8+o9jPnDqABzzHa2C8jFkfqYXQlEBTCFfFWsQnymHiU
GFhrqixYy5uvC0K1mGRt+3ds2tpeRbupEVbvuCMCgYEAo3rIkj9+HnaRG2+xY6VQ
uJdOpIxcigKFz5HLNNvk/6ZxGoD3yF7tHCU0NIBktMOwx7BfSnMI0/WKxMYoDwR5
MLn1+O8/91ZGyOWGIAHBgpfg/dLYUekhg8HyGYj2XxBiFlTRHeJxXad3FQKsw7OO
hDMA68pMKiODC3iYk1H0FQECgYASxLxzMDJ+KiR1SRKwdcYC5vm0/GhKueeF4ufZ
wZwD48ln/F1S4rPpx/F4Eet/Uxjd8nlXruDvSYUzDPhrW5pRyhKcvsj3qDl3ywRh
Ff4gV1yf4nkOjmB5B4DzVedLNAdFPTXcm46kxVQvDsO77r4bpHRUXSqgK+qN+TA/
1mc8wQKBgQDQG9cP25yv77i8N62FR9FiexYACTISbYY1/cceMaXvXGWPtuxAz6io
1RLAOBj+T4jwIvnuXaeIoiyvGOU0gtqN07y3f4zxOYptjFYsUblvTc+l1eWvlSij
uwt86UY+oISZa9VIUZX0kxaRbw0fpExXv0gzID6UUlAuCeU8JrtNkw==
-----END RSA PRIVATE KEY-----
"""

DS_CONFIG = {
    "ds_client_id": f"{INTEGRATION_KEY}",  # The app's DocuSign integration key
    "ds_client_secret": f"{SECRET_KEY}",  # The app's DocuSign integration key's secret
    "signer_email": f"{SIGNER_EMAIL}",
    "signer_name": f"{SIGNER_NAME}",
    "app_url": "http://localhost:5000",  # The url of the application. Eg http://localhost:5000
    # NOTE: You must add a Redirect URI of appUrl/ds/callback to your Integration Key.
    #       Example: http://localhost:5000/ds/callback
    "authorization_server": "https://account-d.docusign.com",
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
    "authorization_server": "account-d.docusign.com",
}
