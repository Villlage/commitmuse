import os

client_build_dir = (
    os.getenv("REACT_FILES")
    if os.getenv("REACT_FILES") is not None
    else "client/build-dev"
)


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", "postgres://postgres@localhost/village"
    )
    # SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    DEBUG = False
    TESTING = False
    LOG_LEVEL = "INFO"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "thisisasecretkey")

    PLAID_CLIENT_ID = os.getenv("PLAID_CLIENT_ID", "5f3b6efe21746b00118db03f")
    PLAID_SECRET = os.getenv("PLAID_SECRET", "feb5a4deba85df5298700197712d8d")
    PLAID_PUBLIC_KEY = os.getenv("PLAID_PUBLIC_KEY", "a004a070f0629da694fbae916414f3")
    PLAID_ENV = os.getenv("PLAID_ENV", "sandbox")

    # docusign config
    DOCUSIGN_ACCESS_TOKEN = os.getenv(
        "DOCUSIGN_ACCESS_TOKEN",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjY4MTg1ZmYxLTRlNTEtNGNlOS1hZjFjLTY4OTgxMjIwMzMxNyJ9.eyJUb2tlblR5cGUiOjUsIklzc3VlSW5zdGFudCI6MTU5NjQ2ODY5NCwiZXhwIjoxNTk2NDk3NDk0LCJVc2VySWQiOiJiOWQ3NmEyYS1lMzMyLTRhNWQtODU5Mi1jZjcwZjkxOTUxOTgiLCJzaXRlaWQiOjEsInNjcCI6WyJzaWduYXR1cmUiLCJjbGljay5tYW5hZ2UiLCJvcmdhbml6YXRpb25fcmVhZCIsInJvb21fZm9ybXMiLCJncm91cF9yZWFkIiwicGVybWlzc2lvbl9yZWFkIiwidXNlcl9yZWFkIiwidXNlcl93cml0ZSIsImFjY291bnRfcmVhZCIsImRvbWFpbl9yZWFkIiwiaWRlbnRpdHlfcHJvdmlkZXJfcmVhZCIsImR0ci5yb29tcy5yZWFkIiwiZHRyLnJvb21zLndyaXRlIiwiZHRyLmRvY3VtZW50cy5yZWFkIiwiZHRyLmRvY3VtZW50cy53cml0ZSIsImR0ci5wcm9maWxlLnJlYWQiLCJkdHIucHJvZmlsZS53cml0ZSIsImR0ci5jb21wYW55LnJlYWQiLCJkdHIuY29tcGFueS53cml0ZSJdLCJhdWQiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJhenAiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJpc3MiOiJodHRwczovL2FjY291bnQtZC5kb2N1c2lnbi5jb20vIiwic3ViIjoiYjlkNzZhMmEtZTMzMi00YTVkLTg1OTItY2Y3MGY5MTk1MTk4IiwiYXV0aF90aW1lIjoxNTk2NDU4MDgwLCJwd2lkIjoiYjBkNTNhNGMtZmVhYy00ZjY4LThlOWUtZjE4MzM4MTNkYTQ5In0.iy7e8NQIJyjco9sbzhRKlcBudso9XHQb3E8cHLaI-BqsJOds2Z2cS2IvyoiUTf3A81tUxNWdA2Boi0-wTc4W9bXJ-HUBJxGPd2jXGANPGdvOvO4B_bqfmRyhiPkzb21pt54CJUyRngq3cbRnCe9QYDcdai393NSC_DCpa-r2f7uIOoA9ULvFi_mig76R1eNlJK3d0dONPlmIa_BPAajW1vjguNERp59pKo6PW8wNRI9UHoSURcDW5NNlU3G3HpmMsqPVfkn1_2yLal04Llt1gJdJpr1MP1Iovipfuw3tJGNl_nb45sZ8qB8Bf7NlHapiLF5XZD-rElJteA1xyU5sNQ",
    )
    DOCUSIGN_ACCOUNT_ID = os.getenv("DOCUSIGN_ACCOUNT_ID", 11042268)
    DOCUSIGN_BASE_PATH = os.getenv(
        "DOCUSIGN_BASE_PATH", "https://demo.docusign.net/restapi"
    )

    # integration id and client id are synonyms here
    DOCUSIGN_CLINET_ID = os.getenv(
        "DOCUSIGN_CLINET_ID", "4ecc3248-c115-4782-bbb3-776260404d09"
    )
    DOCUSIGN_SECRET_KEY = os.getenv(
        "DOCUSIGN_SECRET_KEY", "e4df848e-b88d-4731-a758-85765ed814be"
    )
    DOCUSIGN_USER_ID = os.getenv(
        "DOCUSIGN_USER_ID", "b9d76a2a-e332-4a5d-8592-cf70f9195198"
    )

    SENDGRID_API_KEY = "SOMETHING"

    WEB_APP_DOMAIN = os.getenv("WEB_APP_DOMAIN")

    # DOCUSIGN_CLIENT_ID = "9ece7d69-24d6-43ce-9a1c-cbfe3b11c819"
    # DOCUSIGN_CLIENT_SECRET = "0fab5434-db92-41d7-86a1-6a71e7aefc7f"
    AUTHORIZATION_SERVER = "https://account-d.docusign.com"
    AUTHORIZE_URL = "https://account-d.docusign.com/oauth/auth"
    ACCESS_TOKEN_URL = "https://account-d.docusign.com/oauth/token"
    ALLOW_SILENT_AUTHENTICATION = True
    BASE_URL = "https://demo.docusign.net"
    CODE_GRANT = "code grant"
    TARGET_ACC_ID = None
    SIGNATURE = "signature"

    DOCUSIGN_CLIENT_ID = "4ecc3248-c115-4782-bbb3-776260404d09"
    INTEGRATION_KEY_PRODUCTION = "841c2045-208d-423d-ac21-c5e5883de495"

    DOCUSIGN_CLIENT_SECRET = INTEGRATION_KEY_PRODUCTION
    DOCUSIGN_PRODUCTION_CLIENT_SECRET = "3fe3198d-29e4-4357-ac2f-c94d904a7306"

    SIGNER_EMAIL = "gilad.kahala@gmail.com"
    SIGNER_NAME = "Gilad Kahala"

    IMPERSONATED_USER_ID = "b9d76a2a-e332-4a5d-8592-cf70f9195198"
    SECRET_KEY = "e4df848e-b88d-4731-a758-85765ed814be"
    DS_PAYMENT_GATEWAY_ID = None


class LocalConfig(Config):
    DEBUG = True
    LOG_LEVEL = "DEBUG"
    SQLALCHEMY_DATABASE_URI = "postgres://localhost/village"

    WEB_APP_DOMAIN = "http://localhost:5000/web"


class TestingConfig(Config):
    ENV = "testing"
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", "postgresql://localhost/village_test"
    )
    WEB_APP_DOMAIN = "http://localhost:5000/web"


class StagingConfig(Config):
    LOG_LEVEL = "INFO"
    WEB_APP_DOMAIN = "https://commitmuse-staging.herokuapp.com/web"


class ProductionConfig(Config):
    LOG_LEVEL = "INFO"
    WEB_APP_DOMAIN = "https://commitmuse.herokuapp.com/web"
