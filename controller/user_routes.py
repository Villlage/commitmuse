from flask import request, jsonify
from typing import Tuple
from werkzeug import Response
from app import app, logger


@app.route("/login", methods=["POST"])  # type: ignore
def login() -> Tuple[Response, int]:
    """
    login a user with email and password
    """
    email = request.json.get("email")
    password = request.json.get("password")
    logger.info(email + " " + password)
    return jsonify(), 204
