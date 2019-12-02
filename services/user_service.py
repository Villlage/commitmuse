from common.exceptions import ResourceConflictError
from models.user import User
from werkzeug.security import generate_password_hash


def create_user(email: str, password: str) -> User:
    hashed_password = generate_password_hash(password)

    if User.get_user_by_email(email):
        raise ResourceConflictError("Please sign in. This email address is in use")

    return User.create_user(email=email, password=hashed_password)
