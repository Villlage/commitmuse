import os

client_build_dir = (
    os.getenv("REACT_FILES")
    if os.getenv("REACT_FILES") is not None
    else "client/build-dev"
)


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    DEBUG = False
    TESTING = False
    LOG_LEVEL = "INFO"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "thisisasecretkey")

    PLAID_CLIENT_ID = os.getenv("PLAID_CLIENT_ID", "5f3b6efe21746b00118db03f")
    PLAID_SECRET = os.getenv("PLAID_SECRET", "feb5a4deba85df5298700197712d8d")
    PLAID_PUBLIC_KEY = os.getenv("PLAID_PUBLIC_KEY", "a004a070f0629da694fbae916414f3")
    PLAID_ENV = os.getenv("PLAID_ENV", "sandbox")

    WEB_APP_DOMAIN = os.getenv("WEB_APP_DOMAIN")
    WEB_APP_SERVER = os.getenv("WEB_APP_SERVER")

    # Sendgrid
    SENDGRID_API_KEY = (
        "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"
    )

    # Docusign
    DOCUSIGN_ACCOUNT_ID = os.getenv("DOCUSIGN_ACCOUNT_ID", 11042268)
    DOCUSIGN_BASE_PATH = os.getenv(
        "DOCUSIGN_BASE_PATH", "https://demo.docusign.net/restapi"
    )
    AUTHORIZATION_SERVER = os.getenv("AUTHORIZATION_SERVER", "account-d.docusign.com")
    DOCUSIGN_CLIENT_ID = os.getenv(
        "DOCUSIGN_CLIENT_ID", "4ecc3248-c115-4782-bbb3-776260404d09"
    )
    IMPERSONATED_USER_ID = os.getenv(
        "IMPERSONATED_USER_ID", "b9d76a2a-e332-4a5d-8592-cf70f9195198"
    )
    PRIVATE_KEY_LOCATION = os.getenv("PRIVATE_KEY_LOCATION", "./demo-private.key")
    ISA_TEMPLATE_ID = os.getenv(
        "PRIVATE_KEY_LOCATION", "4652a178-cac7-491a-b03d-bdba57b6f175"
    )


class LocalConfig(Config):
    DEBUG = True
    LOG_LEVEL = "DEBUG"
    SESSION_COOKIE_SAMESITE = 'None'
    SESSION_COOKIE_SECURE = True

    WEB_APP_DOMAIN = "http://localhost:5000/web"
    WEB_APP_SERVER = "http://localhost:5000"


class TestingConfig(Config):
    ENV = "testing"
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", "postgresql://localhost/village_test"
    )
    WEB_APP_DOMAIN = "http://localhost:5000/web"
    WEB_APP_SERVER = "http://localhost:5000"


class StagingConfig(Config):
    LOG_LEVEL = "INFO"
    WEB_APP_DOMAIN = "https://staging.commitmuse.com/web"
    WEB_APP_SERVER = "https://staging.commitmuse.com"


class ProductionConfig(Config):
    LOG_LEVEL = "INFO"
    WEB_APP_DOMAIN = "https://app.commitmuse.com/web"
    WEB_APP_SERVER = "https://app.commitmuse.com"

    # docusign config
    DOCUSIGN_ACCOUNT_ID = 35738896
    DOCUSIGN_BASE_PATH = "https://na2.docusign.net/restapi"
    AUTHORIZATION_SERVER = "account.docusign.com"
    DOCUSIGN_CLIENT_ID = "4ecc3248-c115-4782-bbb3-776260404d09"
    IMPERSONATED_USER_ID = "9a5159c4-ff31-4f7c-834b-784e0941365a"
    PRIVATE_KEY_LOCATION = "./private.key"
    ISA_TEMPLATE_ID = "c87731cd-8404-4834-9a9e-d28a1714c893"
