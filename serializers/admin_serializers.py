from typing import Dict, Any
from marshmallow import Schema, fields, pre_load


class AdminUsersPageSchema(Schema):  # type: ignore
    limit = fields.Int(required=False, missing=None, default=None)

    @pre_load  # type: ignore
    def process_trades(self, data: Dict[str, Any], **kwargs) -> Dict[str, Any]:  # type: ignore
        data = data.to_dict()  # type: ignore
        return data


admin_users_page_schema = AdminUsersPageSchema()