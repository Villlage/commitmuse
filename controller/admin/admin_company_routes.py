# type: ignore
from typing import Tuple
from app import app
from controller.common import admin_login_required
from models.company import Company
from serializers.company_serializers import AdminCompanySchema
import marshmallow
from flask import Response, request, jsonify

from services.company_service import update_company


@app.route("/admin/companies", methods=["GET"])
@admin_login_required
def admin_companies() -> Tuple[Response, int]:
    companies = Company.get_all()

    company_schema = AdminCompanySchema()
    companies = company_schema.dump(companies, many=True)

    return jsonify(companies), 200


@app.route("/admin/companies/<int:company_id>", methods=["PATCH"])
@admin_login_required
def admin_patch_company(company_id: int) -> Tuple[Response, int]:
    company = Company.get_company_by_id(company_id)
    try:
        payload = request.json
        update_company(company, payload)

    except marshmallow.exceptions.ValidationError as error:
        return jsonify(error=error.messages), 400

    company_schema = AdminCompanySchema()
    result = company_schema.dump(company)

    return jsonify(result), 200
