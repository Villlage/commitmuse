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


#docusign config
authentication_method = "None"

# Obtain an OAuth access token from https://developers.docusign.com/oauth-token-generator
access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjY4MTg1ZmYxLTRlNTEtNGNlOS1hZjFjLTY4OTgxMjIwMzMxNyJ9.eyJUb2tlblR5cGUiOjUsIklzc3VlSW5zdGFudCI6MTU5NjAzNDIzMCwiZXhwIjoxNTk2MDYzMDMwLCJVc2VySWQiOiI5MWUzMDE0Mi0yZjc2LTQwOTAtOGZiYS1kMGFhZjMwYzJkZjMiLCJzaXRlaWQiOjEsInNjcCI6WyJzaWduYXR1cmUiLCJjbGljay5tYW5hZ2UiLCJvcmdhbml6YXRpb25fcmVhZCIsInJvb21fZm9ybXMiLCJncm91cF9yZWFkIiwicGVybWlzc2lvbl9yZWFkIiwidXNlcl9yZWFkIiwidXNlcl93cml0ZSIsImFjY291bnRfcmVhZCIsImRvbWFpbl9yZWFkIiwiaWRlbnRpdHlfcHJvdmlkZXJfcmVhZCIsImR0ci5yb29tcy5yZWFkIiwiZHRyLnJvb21zLndyaXRlIiwiZHRyLmRvY3VtZW50cy5yZWFkIiwiZHRyLmRvY3VtZW50cy53cml0ZSIsImR0ci5wcm9maWxlLnJlYWQiLCJkdHIucHJvZmlsZS53cml0ZSIsImR0ci5jb21wYW55LnJlYWQiLCJkdHIuY29tcGFueS53cml0ZSJdLCJhdWQiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJhenAiOiJmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgiLCJpc3MiOiJodHRwczovL2FjY291bnQtZC5kb2N1c2lnbi5jb20vIiwic3ViIjoiOTFlMzAxNDItMmY3Ni00MDkwLThmYmEtZDBhYWYzMGMyZGYzIiwiYW1yIjpbImludGVyYWN0aXZlIl0sImF1dGhfdGltZSI6MTU5NjAzNDIyNiwicHdpZCI6ImZlMTM5MDVhLTg4MzYtNDgwZC1iYjI2LTg3YmQxMWQxNDE4MCJ9.HdZXoKY6tjmrSrbn12TLN9yhJr5fIc0vqI5Xv_ykzXSZVCE8AG56Wg0jueE9QMqD02eU07iaqfe42burFn8DUPIsVnv4aLeCvfFyoHH5-aT4-r_uj2PdZ4_g-dycHXJl5t6AZVrX3tTkBKRHBffvE8cpAHkAOMvznHGM4lx7iuvdAIVYiB-d5Ub7_-rLYwr-zcC4J60AktmE-uXOi08jCdHHnyGzwBqwDb8N-DXAM4DKhvBoNjojVKSDALL9ZHZh24waT8svz-jZ8CwBgy6XJ60AEoZfFDdmEsX1yQM8j0bX7wZdj2vhYCIRobduj3daJJpUAcVTUb4ZEBK8ZOv95w"

# Obtain your accountId from demo.docusign.com -- the account id is shown in the drop down on the
account_id = 11089496

base_path = 'https://demo.docusign.net/restapi'
