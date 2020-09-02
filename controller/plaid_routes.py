from controller.common import get_current_user
from serializers.plaid_serializers import (
    plaid_request_schema,
    plaid_item_schema,
    plaid_item_get_schema,
)
from werkzeug import Response

from flask import request, jsonify
from app import app

from controller.common import login_required
from services.plaid_service import create_plaid_item, get_plaid_items
from typing import Tuple
from third_party.plaid.plaid_client import get_link_token


@app.route("/plaid/items", methods=["POST"])
@login_required
def plaid_item_create() -> Tuple[Response, int]:
    user = get_current_user()

    request_data = plaid_request_schema.load(request.json)
    plaid_item = create_plaid_item(user=user, schema=request_data,)

    response = plaid_item_schema.dump(plaid_item)
    return jsonify(response), 200


@app.route("/plaid/items", methods=["GET"])
@login_required
def get_plaid_items_route() -> Tuple[Response, int]:
    user = get_current_user()
    schema = plaid_item_get_schema.load(request.args)

    plaid_items = get_plaid_items(user=user, company_id=schema["company_id"])

    response = plaid_item_schema.dump(plaid_items, many=True)
    return jsonify(response), 200


@app.route("/plaid/link-token", methods=["GET"])
def plaid_link_token() -> Tuple[Response, int]:
    return jsonify(get_link_token()), 200
