from flask import request, jsonify
from typing import Tuple
from werkzeug import Response
from app import app
from models.user import User
from services.user_service import create_user, get_user, reset_password
from serializers.user_serializers import (
    login_schema,
    user_schema,
    reset_password_schema,
    update_user_schema,
)
from flask_login import login_user, logout_user, current_user
from controller.common import login_required, get_current_user
from common.constants import INDUSTRY_FIELDS


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


@app.route("/user", methods=["GET", "PATCH"])
@login_required
def user() -> Tuple[Response, int]:
    user = get_current_user()

    if request.method == "PATCH":
        schema = update_user_schema.load(request.json)
        user = user.update_user(attributes=schema)

    result = user_schema.dump(user)

    return jsonify(result), 200


@app.route("/coach/<int:coach_id>", methods=["GET"])
def get_coach(coach_id: int) -> Tuple[Response, int]:
    coach = User.get_user(coach_id)
    result = user_schema.dump(coach)

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


@app.route("/users/reset-password", methods=["PATCH", "GET"])
def reset_user_password() -> Tuple[Response, int]:
    schema = reset_password_schema.load(request.json)
    user = reset_password(token=schema["token"], password=schema["password"])
    login_user(user)
    result = user_schema.dump(user)

    return jsonify(result), 200


@app.route("/industry-fields", methods=["GET"])
def industry_fields() -> Tuple[Response, int]:
    return jsonify(INDUSTRY_FIELDS), 200
