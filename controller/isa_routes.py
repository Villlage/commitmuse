from flask import request, jsonify
from typing import Any, Dict, List, Tuple
import marshmallow
from werkzeug import Response
from app import app
from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
    AuthorizationError,
)
from serializers.user_serializers import (
    update_isa_schema,
    create_isa_schema,
    isa_schema,
)

from services.isa_service import get_isa_by_id, create_student_and_isa
from controller.common import login_required, get_current_user
from models.user import User
from models.isa import ISA


@app.route("/isas/<int:isa_id>", methods=["GET", "PATCH", "DELETE"])
@login_required
def get_or_update_isa(isa_id: int) -> Tuple[Response, int]:
    user = get_current_user()  # type: User

    try:
        isa = get_isa_by_id(coach_id=user.id, isa_id=isa_id)  # type: ISA
        if request.method == "PATCH":
            schema = update_isa_schema.load(request.json)
            isa = isa.update_isa(**schema)
        elif request.method == "DELETE":
            isa.delete()
            return jsonify(), 204

    except marshmallow.exceptions.ValidationError as error:
        return jsonify(error=error.messages), 400
    except AuthorizationError:
        return jsonify(error="you are not authorized to view this"), 403
    except ResourceNotFound:
        return jsonify(error="Resource Not Found"), 404

    result = isa_schema.dump(isa)
    return jsonify(result), 200


@app.route("/isas", methods=["POST"])
@login_required
def create_isa_route() -> Tuple[Response, int]:
    get_current_user()
    try:
        schema = create_isa_schema.load(request.json)
        isa = create_student_and_isa(schema)

    except marshmallow.exceptions.ValidationError as error:
        return jsonify(error=error.messages), 400

    result = isa_schema.dump(isa)
    return jsonify(result), 200


@app.route("/isas", methods=["GET"])
@login_required
def get_isas() -> Tuple[Response, int]:
    user = get_current_user()  # type: User
    result = isa_schema.dump(user.isas, many=True)  # type: List[Dict[Any, Any]]
    return jsonify(result), 200
