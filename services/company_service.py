from common.exceptions import (
    ResourceNotFound,
    AuthenticationError,
    AuthorizationError,
)
from models.company import Company
from typing import Any, Dict, List

from models.user import User, UserRole
from models.isa import ISA


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
    creating a company and assigning the user that created it as an admin user for that company
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


def get_company_isas(company_id: int, user: User) -> List[ISA]:
    company = get_company_by_id(company_id=company_id, user=user)
    isa_list = []  # type: List[ISA]
    for user in company.users:
        isa_list.extend(user.isas)
    return isa_list


def get_company_coaches(company_id: int, user: User) -> List[User]:
    company = get_company_by_id(company_id=company_id, user=user)
    users = company.users  # type: List[User]
    return users
