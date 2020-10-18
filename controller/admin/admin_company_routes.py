# type: ignore
from typing import Tuple
from flask import Response, jsonify
from app import app
from controller.common import admin_login_required
from models.company import Company
from serializers.company_serializers import AdminCompanySchema


@app.route("/admin/companies", methods=["GET"])
@admin_login_required
def admin_companies() -> Tuple[Response, int]:
    companies = Company.get_all()

    company_schema = AdminCompanySchema()
    companies = company_schema.dump(companies, many=True)

    return jsonify(companies), 200
