from common.exceptions import (
    ResourceNotFound,
    AuthenticationError,
    AuthorizationError,
)
from models.company import Company
from typing import Any, Dict, List

from models.user import User, UserRole, Coach
from models.isa import ISA

from services.email_service import send_coach_invitation


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


def update_company(company: Company, schema: Dict[Any, Any]) -> Company:
    return company.update_company(attributes=schema)


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
    isas = _get_company_isas(company=company)
    return isas


def _get_company_isas(company: Company) -> List[ISA]:
    isa_list = []  # type: List[ISA]
    for user in company.users:
        isa_list.extend(user.isas)
    return isa_list


def get_company_coaches(company_id: int, user: User) -> List[User]:
    company = get_company_by_id(company_id=company_id, user=user)
    users = company.users  # type: List[User]
    return users


def get_company_overview(company_id: int, user: User) -> Dict[Any, Any]:
    company = get_company_by_id(company_id=company_id, user=user)
    coaches = company.users  # type: List[User]
    isas = _get_company_isas(company)
    return dict(
        coaches=len(coaches),
        isas=len(isas),
        total_revenue=0,
        last_payment=dict(value=0, date=None),
    )


def invite_coach_to_company(
    company_id: int, user: User, schema: Dict[Any, Any]
) -> Coach:
    """
    invite a new user as a coach and and assign them to a company.
    """

    company = get_company_by_id(company_id=company_id, user=user)
    coach = User.get_user_by_email(schema["email"])
    schema["company_id"] = company_id
    if not coach:
        coach = Coach.create_user(**schema)
    else:
        coach.update_user(dict(company_id=company_id))

    send_coach_invitation(coach=coach, company=company)

    return coach
