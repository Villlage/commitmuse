from functools import wraps

from flask import request, jsonify
from typing import Tuple, Optional, Callable
from werkzeug import Response
from app import app
from common.exceptions import (
    ResourceNotFound,
)
from models.user import User
from services.user_service import create_user, get_user, reset_password
from serializers.user_serializers import (
    login_schema,
    user_schema,
    reset_password_schema,
)
from flask_login import login_user, logout_user, current_user
from controller.common import login_required, get_current_user


@app.route("/login", methods=["POST"])
def login() -> Tuple[Response, int]:
    """
    login a user with email and password
    """
    schema = login_schema.load(request.json)
    user = get_user(email=schema["email"], password=schema["password"])
    login_user(user)
    result = user_schema.dump(user)
    return jsonify(result), 200


@app.route("/check-auth", methods=["GET"])
def check_auth() -> Tuple[Response, int]:
    return jsonify(current_user.is_authenticated), 200


@app.route("/user", methods=["GET"])
@login_required
def user() -> Tuple[Response, int]:
    user = get_current_user()
    result = user_schema.dump(user)

    return jsonify(result), 200


@app.route("/register", methods=["POST"])
def register() -> Tuple[Response, int]:
    """
    register a user with an email and a password
    """
    schema = login_schema.load(request.json)
    user = create_user(schema)
    login_user(user)

    return jsonify("user registered successfully"), 200


@app.route("/logout", methods=["GET", "POST"])
@login_required
def logout() -> Tuple[Response, int]:
    """
    logout a user
    """
    logout_user()
    return jsonify("logged out user successfully"), 200


def _get_user(user_id: Optional[int] = None) -> "User":

    user = get_user_or_none(user_id=user_id)

    if not user:
        raise ResourceNotFound("User Not Found")

    return user


def get_user_or_none(user_id: Optional[int] = None) -> Optional["User"]:
    user_id = _get_user_id(user_id)

    user = None
    if user_id and current_user.is_authenticated and current_user.is_admin():
        user = User.get_user(user_id)
    elif current_user.is_authenticated:
        user = User.query.filter(User.id == current_user.id).one_or_none()

    return user


def _get_user_id(user_id: Optional[int] = None) -> Optional[int]:
    if user_id:
        return user_id

    if request.method == "GET":
        user_id = request.args.get("user_id", None)
    elif request.json:
        user_id = request.json.get("user_id", None)

    return user_id


@app.route("/users/reset-password", methods=["PATCH", "GET"])
def reset_user_password() -> Tuple[Response, int]:
    schema = reset_password_schema.load(request.json)
    user = reset_password(token=schema["token"], password=schema["password"])
    login_user(user)
    result = user_schema.dump(user)

    return jsonify(result), 200


def admin_login_required(function: Callable) -> Callable:  # type: ignore
    @wraps(function)
    def wrapped(*args, **kwargs):  # type: ignore
        if current_user.is_anonymous or not current_user.is_admin():
            return jsonify(error="Admin login required"), 403

        return function(*args, **kwargs)

    return wrapped
