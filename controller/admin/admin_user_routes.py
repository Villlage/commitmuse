# type: ignore
from typing import Tuple
from flask import Response, jsonify
from app import app
from controller.common import admin_login_required
from models.user import User
from serializers.user_serializers import AdminUserSchema


@app.route("/admin/users", methods=["GET"])
@admin_login_required
def admin_users() -> Tuple[Response, int]:
    users = User.get_all_users()

    user_schema = AdminUserSchema()
    users = user_schema.dump(users, many=True)

    return jsonify(users), 200
