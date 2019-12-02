from flask import request, jsonify
from typing import Tuple
import marshmallow
from werkzeug import Response
from app import app
from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
)
from services.user_service import create_user, get_user
from serializers.user_serializers import login_schema


@app.route("/login", methods=["POST"])
def login() -> Tuple[Response, int]:
    """
    login a user with email and password
    """
    email = request.json.get("email")
    password = request.json.get("password")

    try:
        login_schema.load(dict(email=email, password=password))
        user = get_user(email=email, password=password)
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
    register a user
    """

    email = request.json.get("email")
    password = request.json.get("password")

    try:
        login_schema.load(dict(email=email, password=password))
        create_user(email=email, password=password)
    except marshmallow.exceptions.ValidationError as error:
        return jsonify(error=error.messages), 400
    except ResourceConflictError as error:
        return jsonify(error=error.message), 409

    return jsonify("user registered successfully"), 200
