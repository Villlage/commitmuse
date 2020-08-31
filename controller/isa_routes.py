from flask import request, jsonify
from typing import Any, Dict, List, Tuple
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

from services.isa_service import (
    get_isa_by_id,
    create_student_and_isa,
    get_isa_by_id_with_access_token,
)
from controller.common import login_required, get_current_user
from models.user import User
from models.isa import ISA

from third_party.docusign.client import docusign_client
from flask import redirect, url_for


@app.route("/isas/<int:isa_id>", methods=["GET", "PATCH", "DELETE"])
@login_required
def get_or_update_isa(isa_id: int) -> Tuple[Response, int]:
    user = get_current_user()  # type: User

    isa = get_isa_by_id(coach_id=user.id, isa_id=isa_id)  # type: ISA

    if request.method == "PATCH":
        schema = update_isa_schema.load(request.json)
        isa = isa.update_isa(**schema)
    elif request.method == "DELETE":
        isa.delete()
        return jsonify(), 204

    result = isa_schema.dump(isa)
    return jsonify(result), 200


@app.route("/client/isas/<int:isa_id>", methods=["GET"])
def get_isa_by_access_token(isa_id: int) -> Tuple[Response, int]:
    """
    TODO: add access token functionality
    """
    access_token = request.args.get("access_token", "abc123")

    isa = get_isa_by_id_with_access_token(
        isa_id=isa_id, access_token=access_token
    )  # type: ISA

    result = isa_schema.dump(isa)
    return jsonify(result), 200


@app.route("/isas", methods=["POST"])
@login_required
def create_isa_route() -> Tuple[Response, int]:
    get_current_user()
    schema = create_isa_schema.load(request.json)

    isa = create_student_and_isa(schema)

    result = isa_schema.dump(isa)
    return jsonify(result), 200


@app.route("/isas", methods=["GET"])
@login_required
def get_isas() -> Tuple[Response, int]:
    user = get_current_user()  # type: User
    result = isa_schema.dump(user.isas, many=True)  # type: List[Dict[Any, Any]]
    return jsonify(result), 200


@app.route("/isas/<int:isa_id>/sign", methods=["GET"])
@login_required
def sign_isa(isa_id: int) -> Tuple[Response, int]:
    """
    sign ISA by the coach/company
    """
    user = get_current_user()
    isa = get_isa_by_id(coach_id=user.id, isa_id=isa_id)  # type: ISA

    if not docusign_client.ds_token_ok():
        return redirect(url_for("ds_login")), 302

    results = docusign_client.embedded_signing(user=isa.coach, isa=isa)
    # send_isa_offer(isa)
    return redirect(results.url), 302

    results = docusign_client.embedded_signing(user=isa.coach, isa=isa)

    return redirect(results.url), 302
