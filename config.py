import os


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

    #docusign config
    AUTHENTICATION_METHOD = os.getenv("AUTHENTICATION_METHOD","None")
    # Obtain an OAuth access token from https://developers.docusign.com/oauth-token-generator
    ACCESS_TOKEN = os.getenv("ACCESS_TOKEN","eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjY4MTg1ZmYxLTRlNTEtNGNlOS1hZjFjLTY4OTgxMjIwMzMxNyJ9.eyJUb2tlblR5cGUiOjUsIklzc3VlSW5zdGFudCI6MTU5NjA5OTM5OSwiZXhwIjoxNTk2MTI4MTk5LCJVc2VySWQiOiI5MWUzMDE0Mi0yZjc2LTQwOTAtOGZiYS1kMGFhZjMwYzJkZjMiLCJzaXRlaWQiOjEsInNjcCI6WyJzaWduYXR1cmUiLCJjbGljay5tYW5hZ2UiLCJvcmdhbml6YXRpb25fcmVhZCIsInJvb21fZm9ybXMiLCJncm91cF9yZWFkIiwicGVybWlzc2lvbl9yZWFkIiwidXNlcl9yZWFkIiwidXNlcl93cml0ZSIsImFjY291bnRfcmVhZCIsImRvbWFpbl9yZWFkIiwiaWRlbnRpdHlfcHJvdmlkZXJfcmVhZCIsImR0ci5yb29tcy5yZWFkIiwiZHRyLnJvb21zLndyaXRlIiwiZHRyLmRvY3VtZW50cy5yZWFkIiwiZHRyLmRvY3VtZW50cy53cml0ZSIsImR0ci5wcm9maWxlLnJlYWQiLCJkdHIucHJvZmlsZS53cml0ZSIsImR0ci5jb21wYW55LnJlYWQiLCJkdHIuY29tcGFueS53cml0ZSJdLCJhdWQiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJhenAiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJpc3MiOiJodHRwczovL2FjY291bnQtZC5kb2N1c2lnbi5jb20vIiwic3ViIjoiOTFlMzAxNDItMmY3Ni00MDkwLThmYmEtZDBhYWYzMGMyZGYzIiwiYXV0aF90aW1lIjoxNTk2MDk5MzU2LCJwd2lkIjoiZmUxMzkwNWEtODgzNi00ODBkLWJiMjYtODdiZDExZDE0MTgwIn0.jGXdyrD93fp7jiehM3WBdpc4d0z4Ek9oH_T0otyFovtcc_JYGJEY8LhSlwQ1PFlNb5bTSi76S4baE66IU_TDSuZ6ZsWdVll9mD_8eHLUoS8MTb7GuJT_WWbnp6WrZf1IX_aST9to5YULbfY1f2arMQXG4C2-E3lOH70TBqvtyDCesmX25CqCpDtx7HhaQxHP64jxqMtheqYjRNE0gTK0oVhkQZlKwOm8O7Dm7HHMGLtKB3Cf_oVGQQWUXkDkkCUFUYbY0SJrAD354JvHf6CoLoxDLToPfQaYCB2BjnIHm2yxrONQTFNbnrbgvanEPK8fyoKGVdhj-4yu3DAJ2jBggA")
    # Obtain your accountId from demo.docusign.com -- the account id is shown in the drop down on the
    ACCOUNT_ID = os.getenv("ACCOUNT_ID",11089496)
    BASE_PATH = os.getenv("BASE_PATH","https://demo.docusign.net/restapi")
    APP_PATH = os.path.dirname(os.path.dirname((__file__)))

class LocalConfig(Config):
    DEBUG = True
    LOG_LEVEL = "DEBUG"
    SQLALCHEMY_DATABASE_URI = "postgres://localhost/village"


class TestingConfig(Config):
    ENV = "testing"
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", "postgresql://localhost/village_test"
    )


class StagingConfig(Config):
    LOG_LEVEL = "INFO"


class ProductionConfig(Config):
    LOG_LEVEL = "INFO"


