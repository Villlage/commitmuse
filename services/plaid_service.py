from typing import Dict, Any, List, Optional
from third_party.plaid.plaid_client import (
    get_access_token,
    get_plaid_accounts,
    get_plaid_accounts,
)
from models.plaid_item import PlaidItem
from models.plaid_account import PlaidAccount
from models.user import User
from services.company_service import get_company_by_id
from datadog import statsd


def create_plaid_item(user: User, schema: Dict[Any, Any]) -> PlaidItem:
    public_token = schema["public_token"]
    metadata = schema["metadata"]
    company_id = schema["company_id"]

    # check before to see if the company exists and also if the user has permissions to the company
    if company_id:
        get_company_by_id(user=user, company_id=company_id)

    access_token = get_access_token(public_token)

    accounts_response = get_plaid_accounts(access_token)

    plaid_item = _save_plaid_item_and_accounts(
        access_token=access_token,
        user_id=user.id,
        institution_name=metadata["institution"]["name"],
        accounts_response=accounts_response,
        company_id=company_id,
    )
    statsd.increment("plaid.item.create", tags=["plaid"])

    return plaid_item


def _save_plaid_item_and_accounts(
    access_token: str,
    user_id: int,
    institution_name: str,
    accounts_response: Dict[Any, Any],
    company_id: int,
) -> PlaidItem:
    """
    save a plaid item and its accounts
    :param access_token: access token from plaid 
    :param user_id: The user associated with it
    :param institution_name: Institution name from PlaidLink metadata
    :param accounts_response: accounts response from Plaid
    :returns: the plaid item that was created 
    """

    plaid_item = PlaidItem.create_plaid_item(
        access_token, accounts_response["item"], institution_name, user_id, company_id
    )
    accounts = accounts_response["accounts"]  # type: List[Dict[Any, Any]]
    PlaidAccount.create_plaid_accounts(plaid_item, accounts)

    return plaid_item


def get_plaid_items(user: User, company_id: Optional[int] = None) -> List[PlaidItem]:
    """
    if we want the copmany plaid items, we check that the user has permissions, and we return it
    if a company was not requested - return the user plaid items
    """
    plaid_items = user.plaid_items  # type: List[PlaidItem]

    if company_id:
        company = get_company_by_id(user=user, company_id=company_id)
        plaid_items = company.plaid_items

    return plaid_items
