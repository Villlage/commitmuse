from flask import request, jsonify
from typing import Tuple
from werkzeug import Response
from app import app

from serializers.user_serializers import (
    company_schema,
    update_company_schema,
    create_company_schema,
    user_schema,
    isa_schema,
    coach_schema,
)

from services.company_service import (
    get_company_by_id,
    create_company,
    get_company_coaches,
    get_company_isas,
    get_company_overview,
    invite_coach_to_company,
)
from controller.common import login_required, get_current_user
from models.user import User
from models.company import Company


@app.route("/companies/<int:company_id>", methods=["GET", "PATCH", "DELETE"])
@login_required
def company(company_id: int) -> Tuple[Response, int]:
    user = get_current_user()  # type: User

    company = get_company_by_id(company_id=company_id, user=user)  # type: Company

    if request.method == "PATCH":
        schema = update_company_schema.load(request.json)
        company = company.update_company(**schema)
    elif request.method == "DELETE":
        company.delete()
        return jsonify(), 204

    result = company_schema.dump(company)
    return jsonify(result), 200


@app.route("/companies", methods=["POST"])
@login_required
def companies_route() -> Tuple[Response, int]:
    user = get_current_user()
    schema = create_company_schema.load(request.json)
    company = create_company(schema=schema, user=user)
    result = company_schema.dump(company)

    return jsonify(result), 200


@app.route("/companies/<int:company_id>/isas", methods=["GET"])
@login_required
def companies_isas(company_id: int) -> Tuple[Response, int]:
    user = get_current_user()
    isas = get_company_isas(company_id=company_id, user=user)
    result = isa_schema.dump(isas, many=True)

    return jsonify(result), 200


@app.route("/companies/<int:company_id>/coaches", methods=["GET"])
@login_required
def companies_coaches(company_id: int) -> Tuple[Response, int]:
    user = get_current_user()
    coaches = get_company_coaches(company_id=company_id, user=user)
    result = user_schema.dump(coaches, many=True)

    return jsonify(result), 200


@app.route("/companies/<int:company_id>/overview", methods=["GET"])
@login_required
def companies_overview(company_id: int) -> Tuple[Response, int]:
    user = get_current_user()
    overview = get_company_overview(user=user, company_id=company_id)
    return jsonify(overview), 200


@app.route("/companies/<int:company_id>/invitation", methods=["POST"])
def invite_coach(company_id: int) -> Tuple[Response, int]:
    user = get_current_user()
    schema = coach_schema.load(request.json)

    invite_coach_to_company(company_id=company_id, user=user, schema=schema)

    return jsonify("success"), 200
