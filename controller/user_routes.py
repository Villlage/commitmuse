from flask import request, jsonify
from functools import wraps
from typing import Tuple, Callable
import marshmallow
from werkzeug import Response
from app import app, login_manager
from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
)
from services.user_service import create_user, get_user
from serializers.user_serializers import login_schema
from flask_login import login_user, logout_user, current_user


@login_manager.user_loader
def load_user(user_id):  # type: ignore
    from models.user import User

    return User.get_user(user_id)


def login_required(function: Callable):  # type: ignore
    @wraps(function)
    def wrapped(*args, **kwargs):  # type: ignore
        if not current_user.is_authenticated:
            return login_manager.unauthorized(), 401
        return function(*args, **kwargs)

    return wrapped


def admin_login_required(function: Callable) -> Callable:  # type: ignore
    @wraps(function)
    def wrapped(*args, **kwargs):  # type: ignore
        if current_user.is_anonymous or not current_user.is_admin():
            return jsonify(error="Admin login required"), 403
        return function(*args, **kwargs)

    return wrapped


@app.route("/login", methods=["POST"])
def login() -> Tuple[Response, int]:
    """
    login a user with email and password
    """
    try:
        schema = login_schema.load(request.json)
        user = get_user(email=schema["email"], password=schema["password"])
        login_user(user)
    except marshmallow.exceptions.ValidationError as error:
        return jsonify(error=error.messages), 400
    except ResourceNotFound as error:
        return jsonify(error=error.message), 404
    except AuthenticationError as error:
        return jsonify(error=error.message), 403

    return jsonify("successfully logged in user"), 200


@app.route("/register", methods=["POST"])
def register() -> Tuple[Response, int]:
    """
    register a user with an email and a password
    """
    try:
        schema = login_schema.load(request.json)
        user = create_user(email=schema["email"], password=schema["password"])
        login_user(user)
    except marshmallow.exceptions.ValidationError as error:
        return jsonify(error=error.messages), 400
    except ResourceConflictError as error:
        return jsonify(error=error.message), 409

    return jsonify("user registered successfully"), 200


@app.route("/logout", methods=["GET", "POST"])
@login_required
def logout() -> Tuple[Response, int]:
    """
    logout a user
    """
    logout_user()
    return jsonify("logged out user successfully"), 200
