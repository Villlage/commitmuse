# type: ignore
import pytest
from tests.factories import CompanyFactory, SubscriptionFactory, UserFactory
from conftest import logged_in_client
from common.exceptions import ResourceNotFound
from services.subscription_service import get_subscription_by_id


class TestSubscription:
    def test_create(self) -> None:
        company = CompanyFactory.create()
        user = UserFactory.create(company=company)

        payload = dict(company_id=company.id,)

        with logged_in_client(user) as client:
            resp = client.post(f"/subscriptions", json=payload)
            assert resp.status_code == 200
            assert resp.json["is_active"] == True

    def test_bad_create(self) -> None:
        company = CompanyFactory.create()
        user = UserFactory.create(company=company)
        payload = dict(
            project_address="250 1st avenue 4e 10009", company_id=company.id,
        )

        with logged_in_client(user) as client:
            resp = client.post("/subscriptions", json=payload)
            assert resp.status_code == 400

    def test_update(self) -> None:
        company = CompanyFactory.create()
        user = UserFactory.create(company=company)
        subscription = SubscriptionFactory.create(company=company)
        subscription_id = subscription.id

        company_id = company.id
        payload = dict(is_active=False, company_id=company.id)

        with logged_in_client(user) as client:
            resp = client.patch(f"/subscriptions/{subscription_id}", json=payload)
            assert resp.status_code == 200
            assert resp.json["is_active"] == False
            assert resp.json["company"] == company_id

    def test_bad_update_not_found(self) -> None:
        company = CompanyFactory.create()
        user = UserFactory.create()
        subscription = SubscriptionFactory.create(company=company)
        subscription_id = subscription.id + 1

        payload = dict(is_active=False, company_id=company.id)

        with logged_in_client(user) as client:
            resp = client.patch(f"/subscriptions/{subscription_id}", json=payload)
            assert resp.status_code == 403

    def test_get_subscription_by_id(self) -> None:
        company = CompanyFactory.create()
        company_id = company.id
        user = UserFactory.create(company=company)
        subscription = SubscriptionFactory.create(company=company)
        subscription_id = subscription.id

        with logged_in_client(user) as client:
            resp = client.get(
                f"/subscriptions/{subscription_id}?company_id={company_id}"
            )
            assert resp.status_code == 200
            assert resp.json["is_active"] == subscription.is_active

    def test_delete(self) -> None:
        company = CompanyFactory.create()
        company_id = company.id
        user = UserFactory.create(company=company)
        subscription = SubscriptionFactory.create(company=company)
        subscription_id = subscription.id

        with logged_in_client(user) as client:
            resp = client.delete(
                f"/subscriptions/{subscription_id}?company_id={company_id}"
            )
            assert resp.status_code == 204

        with pytest.raises(ResourceNotFound):
            assert get_subscription_by_id(subscription_id=subscription_id, user=user)
