from datetime import datetime, timedelta
import jwt
from app import app
from common.exceptions import TokenValidationError
from typing import Any


def generate_user_token(user_id: Any) -> Any:
    """
    Generates the Auth Token
    :return: string
    documentation: https://realpython.com/token-based-authentication-with-flask/
    """
    try:
        payload = {
            "exp": datetime.utcnow() + timedelta(days=0, seconds=1000),
            "iat": datetime.utcnow(),
            "sub": user_id,
        }
        secret = app.config["SECRET_KEY"]
        return jwt.encode(payload, secret, algorithm="HS256").decode()
    except Exception as e:
        return e


def verify_user_token(auth_token: Any) -> Any:
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    documentation: https://realpython.com/token-based-authentication-with-flask/
    """
    try:
        payload = jwt.decode(auth_token, app.config["SECRET_KEY"])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise TokenValidationError("Signature expired. Please log in again.")
    except Exception:
        raise TokenValidationError("Invalid token")
