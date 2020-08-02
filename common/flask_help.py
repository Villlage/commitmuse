from functools import wraps
from typing import Callable, Any
import marshmallow
from flask import jsonify, request
from flask.helpers import total_seconds, get_env
from flask.sessions import SecureCookieSessionInterface
from itsdangerous import BadSignature

from common.exceptions import (
    AuthorizationError,
    ResourceNotFound,
    AuthenticationError,
)


class SecureCookieSession(SecureCookieSessionInterface):
    def open_session(self, app, request):  # type: ignore
        s = self.get_signing_serializer(app)
        if s is None:
            return None
        val = request.cookies.get(app.session_cookie_name)

        # This statement is to handle the issue where sometimes iOS will concatenate cookies
        # which confuses Flask as it creates an invalid cookie
        for key in request.cookies:
            cookie_val = request.cookies[key]

            if ",session" in cookie_val:
                remove_index = cookie_val.index(",session")

                val = cookie_val[:remove_index]

        if not val:
            return self.session_class()
        max_age = total_seconds(app.permanent_session_lifetime)
        try:
            data = s.loads(val, max_age=max_age)
            return self.session_class(data)
        except BadSignature:
            return self.session_class()


def capture_error_if_needed(error: Exception) -> None:
    """
    TODO: fix logger here
    """
    if get_env() != "testing":  # type: ignore
        print("test error")
        # sentry_sdk.capture_exception(error)


def error_handled(function: Callable) -> Callable:  # type: ignore
    @wraps(function)
    def wrapped(*args, **kwargs):  # type: ignore
        try:
            return function(*args, **kwargs)
        except marshmallow.exceptions.ValidationError as error:
            print(error)
            capture_error_if_needed(error)
            return jsonify(error=error.messages), 400
        except AuthorizationError as error:
            print(error)
            capture_error_if_needed(error)
            return jsonify(error="You are not authorized to view this"), 403
        except ResourceNotFound as error:
            print(error)
            capture_error_if_needed(error)
            return jsonify(error="Resource Not Found"), 404
        except KeyError as error:
            print(error)
            capture_error_if_needed(error)
            return jsonify(error="Missing keys"), 400
        except AuthenticationError as error:
            print(error)
            capture_error_if_needed(error)
            return jsonify(error="Bad Email or password. Please try again."), 403

    return wrapped


def user_agent_header() -> Any:
    return request.headers.get("User-Agent", "")
