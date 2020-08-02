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
