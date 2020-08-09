# type: ignore
from typing import Tuple
from flask import Response, jsonify
from app import app
from controller.user_routes import admin_login_required
from models.isa import ISA
from serializers.isa_serializers import AdminIsaSchema


@app.route("/admin/isas", methods=["GET"])
@admin_login_required
def admin_isas() -> Tuple[Response, int]:
    isas = ISA.get_all_isas()

    isa_schema = AdminIsaSchema()
    isas = isa_schema.dump(isas, many=True)

    return jsonify(isas), 200
