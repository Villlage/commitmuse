from typing import Any, Dict, Optional

from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
)
from models.user import User, Coach, Student
from werkzeug.security import generate_password_hash, check_password_hash


def create_user(schema: Dict[Any, Any]) -> User:
    schema["password"] = generate_password_hash(schema["password"])

    if User.get_user_by_email(schema["email"]):
        raise ResourceConflictError("Please sign in. This email address is in use")

    type = schema.get("type", "coaches")
    user = None
    if type == "coaches":
        user = Coach.create_user(**schema)
    else:
        user = Student.create_user(**schema)

    return user


def get_user(email: str, password: str) -> Optional[User]:
    user = User.get_user_by_email(email=email)
    if not user:
        raise ResourceNotFound("Could not find user. Please Register.")

    if not check_password_hash(user.password, password):  # type: ignore
        raise AuthenticationError("Bad Email or password. Please try again.")

    return user


def get_user_by_id(user_id: int) -> User:
    user = User.get_user(user_id=user_id)
    if not user:
        raise ResourceNotFound("Could not find user. Please Register.")
    return user


def reset_password(token: str, password: str) -> User:
    """
    TODO: change the token to be the real token coming in from the user
    """
    # user_id = verify_user_token(token)
    user_id = int(token)
    user = get_user_by_id(user_id)

    hashed_password = generate_password_hash(password)
    user = user.update_user(dict(password=hashed_password))

    return user


# def _reset_password_link(user: User, url_root: str) -> str:
#     token = generate_user_token(user.id)
#     reset_password_link = f"{url_root}{USER_FORGOT_PASSWORD_ROUTE}?token={token}"
#     return reset_password_link


# def send_user_forgot_password_email(email: str, url_root: str) -> None:
#     user = get_user_by_email(email)
#     reset_password_link = _reset_password_link(user, url_root)
#     send_forgot_password_email(user=user, reset_password_link=reset_password_link)
