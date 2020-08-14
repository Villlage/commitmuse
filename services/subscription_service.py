from common.exceptions import (
    ResourceNotFound,
    AuthenticationError,
    AuthorizationError,
)
from models.subscription import Subscription
from typing import List

from models.user import User, UserRole
from models.isa import ISA


def get_subscription_by_id(subscription_id: int, user: User) -> Subscription:
    subscription = _get_subscription_by_id(subscription_id)
    if user not in subscription.company.users:
        raise AuthorizationError("you are not authorized to view this subscription")

    return subscription


def _get_subscription_by_id(subscription_id: int) -> Subscription:
    subscription = Subscription.get_subscription_by_id(subscription_id)
    if not subscription:
        raise ResourceNotFound("Subscription Not Found")
    return subscription


def assign_user_to_subscription(
    user: User, subscription_id: int, user_role: int = UserRole.REGULAR.value
) -> User:
    attributes = dict(subscription_id=subscription_id, user_role=user_role)
    user = user.update_user(attributes)
    return user


def get_subscription_isas(subscription_id: int, user: User) -> List[ISA]:
    subscription = get_subscription_by_id(subscription_id=subscription_id, user=user)
    isa_list = []  # type: List[ISA]
    for user in subscription.users:
        isa_list.extend(user.isas)
    return isa_list


def get_subscription_coaches(subscription_id: int, user: User) -> List[User]:
    subscription = get_subscription_by_id(subscription_id=subscription_id, user=user)
    users = subscription.users  # type: List[User]
    return users
