from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
    AuthorizationError,
)
from models.company import Company
from typing import Any, Dict

from models.user import User, UserRole


def get_company_by_id(company_id: int, user: User) -> Company:
    company = _get_company_by_id(company_id)
    if user not in company.users:
        raise AuthorizationError("you are not authorized to view this company")

    return company


def _get_company_by_id(company_id: int) -> Company:
    company = Company.get_company_by_id(company_id)
    if not company:
        raise ResourceNotFound("Company Not Found")
    return company


def create_company(schema: Dict[Any, Any], user: User) -> Company:
    """
    creating student from the dictionary and removing the client payload
    """
    company = Company.create_company(**schema)
    assign_user_to_company(
        user=user, company_id=company.id, user_role=UserRole.COMPANY_ADMIN.value
    )

    return company


def assign_user_to_company(
    user: User, company_id: int, user_role: int = UserRole.REGULAR.value
) -> User:
    attributes = dict(company_id=company_id, user_role=user_role)
    user = user.update_user(attributes)
    return user
