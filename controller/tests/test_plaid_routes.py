# type: ignore
import pytest
from app import app
from copy import copy
import json
from tests.factories import PlaidItemFactory, UserFactory, CompanyFactory
from conftest import logged_in_client


from tests.mocks.plaid_response import accounts_response, base_metadata


class TestPlaidItem:
    @pytest.fixture()
    def accounts_payload(self):
        payload = copy(base_metadata)
        payload["accounts"] = accounts_response["accounts"]
        return payload

    @pytest.fixture()
    def mock_get_access(self, mocker):
        return mocker.patch(
            "services.plaid_service.get_access_token", return_value="test_token",
        )

    @pytest.fixture()
    def mock_get_accounts(self, mocker) -> None:
        return mocker.patch(
            "third_party.plaid.plaid_client.client.Accounts.get",
            return_value=accounts_response,
        )

    def test_post(self, accounts_payload, mock_get_access, mock_get_accounts) -> None:
        user = UserFactory.create()
        with logged_in_client(user) as client:
            resp = client.post(
                "/plaid/items",
                data=json.dumps(dict(public_token="test", metadata=accounts_payload)),
                content_type="application/json",
            )
            assert resp.status_code == 200
            assert resp.json["institution_name"] == "test_institution"
            assert resp.json["institution_id"] == "ins_109508"
            assert resp.json["user_id"] == user.id
            assert len(resp.json["plaid_accounts"]) == 3

    def test_get(self) -> None:
        user = UserFactory.create()
        plaid_item1 = PlaidItemFactory.create(user=user)
        plaid_item2 = PlaidItemFactory.create(user=user)
        plaid_items_ids_set = set([plaid_item1.id, plaid_item2.id])
        with logged_in_client(user) as client:
            resp = client.get("/plaid/items")
            assert resp.status_code == 200
            assert set(p["id"] for p in resp.json) == plaid_items_ids_set

    def test_get_company_plaid_items(self) -> None:
        company = CompanyFactory.create()
        company_id = company.id

        user1 = UserFactory.create(company=company)
        user2 = UserFactory.create(company=company)

        plaid_item1 = PlaidItemFactory.create(user=user1)
        plaid_item2 = PlaidItemFactory.create(user=user1)
        # plaid_items_ids_set = set([plaid_item1.id, plaid_item2.id])

        plaid_item3 = PlaidItemFactory.create(user=user2, company=company)
        plaid_item3_id = plaid_item3.id

        with logged_in_client(user1) as client:
            resp = client.get(f"/plaid/items?company_id={company_id}")
            assert resp.status_code == 200
            assert len(resp.json) == 1
            assert resp.json[0]["id"] == plaid_item3_id


class TestPlaidToken:
    @pytest.fixture()
    def mock_link_token(self, mocker) -> None:
        return mocker.patch(
            "third_party.plaid.plaid_client.client.LinkToken.create",
            return_value={
                "expiration": "2020-08-20T14:45:48Z",
                "link_token": "link-sandbox-9108da01-c4d5-495a-a16e-03ba74d33473",
                "request_id": "yxq0mRxo3Px3ZRh",
            },
        )

    def test_create_link_token(self, mock_link_token) -> None:
        with app.test_client() as client:
            resp = client.get(f"/plaid/link-token")
            assert resp.status_code == 200
            assert resp.json == {
                "expiration": "2020-08-20T14:45:48Z",
                "link_token": "link-sandbox-9108da01-c4d5-495a-a16e-03ba74d33473",
                "request_id": "yxq0mRxo3Px3ZRh",
            }
