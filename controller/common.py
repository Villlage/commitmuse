import traceback
from typing import Optional, Any
import marshmallow
from common.exceptions import (
    AuthorizationError,
    TokenValidationError,
)
from werkzeug.exceptions import HTTPException
from flask import request, jsonify
from functools import wraps
from typing import Callable
from app import app, login_manager, logger
from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
)
from flask_login import current_user
import plaid
from services.company_service import _get_company_by_id


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


def company_admin_login_required(function: Callable) -> Callable:  # type: ignore
    @wraps(function)
    def wrapped(*args, **kwargs):  # type: ignore
        if not current_user.is_authenticated:
            return login_manager.unauthorized(), 401

        company_id = _get_company_id_from_request()
        company = _get_company_by_id(company_id)

        if current_user not in company.users and not current_user.is_admin():
            return jsonify(error="Company Login Required"), 403

        return function(*args, **kwargs)

    return wrapped


def admin_login_required(function: Callable) -> Callable:  # type: ignore
    @wraps(function)
    def wrapped(*args, **kwargs):  # type: ignore
        if current_user.is_anonymous or not current_user.is_admin():
            return jsonify(error="Admin login required"), 403
        return function(*args, **kwargs)

    return wrapped


def _get_company_id_from_request() -> Any:
    if request.method in ["GET", "DELETE"]:
        return request.args.get("company_id", None)
    elif request.json:
        return request.json.get("company_id", None)

    return None


def _get_user_id_from_request() -> Any:
    if request.method == "GET":
        return request.args.get("user_id", None)
    elif request.json:
        return request.json.get("user_id", None)

    return None


def get_current_user(user_id: Optional[int] = None) -> Any:
    """
    if we have a user_id in the signature - use that
    if se have a user_id in the request - use that
    if user is admin, get the user_id we want

    and if user is not admin, return current_user
    """
    from models.user import User

    if not user_id:
        user_id = _get_user_id_from_request()

    if user_id and current_user.is_admin():
        return User.get_user(user_id)
    elif current_user:
        return User.get_user(current_user.id)

    return None


@app.errorhandler(Exception)
def handle_exception(exc):  # type:ignore
    # pass through HTTP errors
    if isinstance(exc, HTTPException):
        return exc

    if isinstance(exc, marshmallow.exceptions.ValidationError):
        logger.error(f"Payload: {request.args}")
        return jsonify(error=exc.messages), 400

    if (
        isinstance(exc, AuthenticationError)
        or isinstance(exc, AuthorizationError)
        or isinstance(exc, TokenValidationError)
    ):
        return jsonify(error=exc.message), 403

    if isinstance(exc, ResourceNotFound):
        return jsonify(error=exc.message), 404

    if isinstance(exc, ResourceConflictError):
        return jsonify(error=exc.message), 409

    if isinstance(exc, plaid.errors.PlaidError):
        logger.error("Plaid error - request id: {}".format(exc.request_id))
        return jsonify(error=exc.display_message or exc.code), 500

    # now you're handling non-HTTP exceptions only
    exc_msg = traceback.format_exc()
    logger.error(exc_msg)
    return jsonify({"err_msg": exc_msg}), 500
