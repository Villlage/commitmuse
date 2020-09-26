# type: ignore
from app import app
from controller.common import admin_login_required
from models.user import User
from serializers.user_serializers import AdminUserSchema
from typing import Tuple

import marshmallow
from flask import Response, request, jsonify

from services.user_service import update_user


@app.route("/admin/users", methods=["GET"])
@admin_login_required
def admin_users() -> Tuple[Response, int]:
    users = User.get_all_users()

    user_schema = AdminUserSchema()
    users = user_schema.dump(users, many=True)

    return jsonify(users), 200


@app.route("/admin/users/<int:user_id>", methods=["PATCH"])
@admin_login_required
def admin_patch_user(user_id: int) -> Tuple[Response, int]:
    user = User.get_user(user_id)
    try:
        payload = request.json
        update_user(user, payload)

    except marshmallow.exceptions.ValidationError as error:
        return jsonify(error=error.messages), 400

    user_schema = AdminUserSchema()
    result = user_schema.dump(user)
    return jsonify(result), 200
