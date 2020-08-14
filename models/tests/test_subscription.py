# type: ignore
from models.subscription import Subscription
from tests.factories import CoachFactory, SubscriptionFactory, CompanyFactory


class TestSubscription:
    def test_get_subscription(self) -> None:
        subscription = SubscriptionFactory.create()
        res = Subscription.get_subscription_by_id(subscription.id)
        assert res == subscription

    def test_get_subscription_by_company_id(self) -> None:
        subscription = SubscriptionFactory.create()
        res = Subscription.get_subscription_by_company_id(subscription.company.id)
        assert res == subscription

    def test_create_subscription(self) -> None:
        company = CompanyFactory.create()
        CoachFactory.create()

        arguments = dict(is_active=True, company_id=company.id,)

        subscription = Subscription.create_subscription(**arguments)

        assert subscription
        assert subscription.is_active == arguments["is_active"]
        assert subscription.company_id == company.id

    def test_update(self) -> None:
        subscription = SubscriptionFactory.create()
        company = subscription.company
        is_active = False
        update_args = dict(is_active=is_active)
        subscription = subscription.update_subscription(**update_args)
        assert subscription
        assert subscription.is_active == is_active
        assert subscription.company == company

    def test_delete(self) -> None:
        subscription = SubscriptionFactory.create()
        subscription_id = subscription.id
        subscription.delete()
        res = Subscription.get_subscription_by_id(subscription_id)
        assert res is None
