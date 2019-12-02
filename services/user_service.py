from common.exceptions import ValidationError, ResourceConflictError
from models.user import User
from validate_email import validate_email
from werkzeug.security import generate_password_hash


def create_user(email: str, password: str) -> User:
    if not validate_email(email):
        raise ValidationError("Not a valid email. Please enter a valid one")

    hashed_password = generate_password_hash(password)

    if User.get_user_by_email(email):
        raise ResourceConflictError("Please sign in. This email address is in use")

    return User.create_user(email=email, password=hashed_password)
