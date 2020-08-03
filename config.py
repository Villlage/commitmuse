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

    PLAID_CLIENT_ID = os.getenv("PLAID_CLIENT_ID", "5ae9039e900e950013499ad4")
    PLAID_SECRET = os.getenv("PLAID_SECRET", "b9b6191d2b3e6b4d958e70f7c80a94")
    PLAID_PUBLIC_KEY = os.getenv("PLAID_PUBLIC_KEY", "a004a070f0629da694fbae916414f3")
    PLAID_ENV = os.getenv("PLAID_ENV", "sandbox")

    # docusign config
    DOCUSIGN_ACCESS_TOKEN = os.getenv(
        "DOCUSIGN_ACCESS_TOKEN",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjY4MTg1ZmYxLTRlNTEtNGNlOS1hZjFjLTY4OTgxMjIwMzMxNyJ9.eyJUb2tlblR5cGUiOjUsIklzc3VlSW5zdGFudCI6MTU5NjIwMzAwOSwiZXhwIjoxNTk2MjMxODA5LCJVc2VySWQiOiI5MWUzMDE0Mi0yZjc2LTQwOTAtOGZiYS1kMGFhZjMwYzJkZjMiLCJzaXRlaWQiOjEsInNjcCI6WyJzaWduYXR1cmUiLCJjbGljay5tYW5hZ2UiLCJvcmdhbml6YXRpb25fcmVhZCIsInJvb21fZm9ybXMiLCJncm91cF9yZWFkIiwicGVybWlzc2lvbl9yZWFkIiwidXNlcl9yZWFkIiwidXNlcl93cml0ZSIsImFjY291bnRfcmVhZCIsImRvbWFpbl9yZWFkIiwiaWRlbnRpdHlfcHJvdmlkZXJfcmVhZCIsImR0ci5yb29tcy5yZWFkIiwiZHRyLnJvb21zLndyaXRlIiwiZHRyLmRvY3VtZW50cy5yZWFkIiwiZHRyLmRvY3VtZW50cy53cml0ZSIsImR0ci5wcm9maWxlLnJlYWQiLCJkdHIucHJvZmlsZS53cml0ZSIsImR0ci5jb21wYW55LnJlYWQiLCJkdHIuY29tcGFueS53cml0ZSJdLCJhdWQiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJhenAiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJpc3MiOiJodHRwczovL2FjY291bnQtZC5kb2N1c2lnbi5jb20vIiwic3ViIjoiOTFlMzAxNDItMmY3Ni00MDkwLThmYmEtZDBhYWYzMGMyZGYzIiwiYW1yIjpbImludGVyYWN0aXZlIl0sImF1dGhfdGltZSI6MTU5NjIwMzAwNSwicHdpZCI6ImZlMTM5MDVhLTg4MzYtNDgwZC1iYjI2LTg3YmQxMWQxNDE4MCJ9.HQM82tC0U2pAZKLvTNp8sHWz5MG3fu7bTpwr5nqZ4ILYFsYH18OA9Yz8dFM_K1HTvsB4Bccek1XSBxkMwpWUvgxVfoUBFcDM_qdjt-aw-a-PfRAEp0DRRhWRKL5ikNtmrWDDkZWFME0dhzeGXAcGB4Q-VgEUQXqtMnMZHkUQQP7YLdJDtMNjChbGJY-DArYiVh7utLYThFoDtnU_AE_i2k0VzH4A29wZRqkkIReBIB0GWwWMnmBAod9-tseysHz2DwsB5HQ4pOFZgylnaaJmSghch960-6MmtMwlvHoE5KiIq9NG4XrRPt_YA7qIvpuGXC6hUvqnhSG6VUROSZLhfg",
    )
    DOCUSIGN_ACCOUNT_ID = os.getenv("DOCUSIGN_ACCOUNT_ID", 11042268)
    DOCUSIGN_BASE_PATH = os.getenv(
        "DOCUSIGN_BASE_PATH", "https://demo.docusign.net/restapi"
    )


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
