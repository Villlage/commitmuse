from flask import request, jsonify
from typing import Tuple
from werkzeug import Response
from app import app
from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
    AuthorizationError,
)
from serializers.user_serializers import (
    update_subscription_schema,
    create_subscription_schema,
    subscription_schema,
)

from services.subscription_service import get_subscription_by_id
from controller.common import company_admin_login_required, get_current_user
from models.user import User
from models.subscription import Subscription


@app.route("/subscriptions/<int:subscription_id>", methods=["GET", "PATCH", "DELETE"])
@company_admin_login_required
def get_or_update_subscription(subscription_id: int) -> Tuple[Response, int]:
    user = get_current_user()  # type: User
    subscription = get_subscription_by_id(
        user=user, subscription_id=subscription_id
    )  # type: Subscription

    if request.method == "PATCH":
        schema = update_subscription_schema.load(request.json)
        subscription = subscription.update_subscription(**schema)
    elif request.method == "DELETE":
        subscription.delete()
        return jsonify(), 204

    result = subscription_schema.dump(subscription)
    return jsonify(result), 200


@app.route("/subscriptions", methods=["POST"])
@company_admin_login_required
def create_subscription_route() -> Tuple[Response, int]:
    schema = create_subscription_schema.load(request.json)
    subscription = Subscription.create_subscription(**schema)
    result = subscription_schema.dump(subscription)
    return jsonify(result), 200


# @app.route("/subscriptions", methods=["GET"])
# @login_required
# def get_subscriptions() -> Tuple[Response, int]:
#     user = get_current_user()  # type: User
#     result = subscription_schema.dump(user.subscriptions, many=True)  # type: List[Dict[Any, Any]]
#     return jsonify(result), 200
