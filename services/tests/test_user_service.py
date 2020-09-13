# type: ignore
import pytest
from werkzeug.security import check_password_hash, generate_password_hash
from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
)
from tests.factories import faker, UserFactory
from services.user_service import create_user, get_user, get_user_by_email


class TestCreateUser:
    def test_create_user(self) -> None:
        email = "something@something.com"
        password = "something"
        payload = dict(email=email, password=password)
        user = create_user(schema=payload)
        assert user.email == email
        assert check_password_hash(user.password, password)

    def test_create_user_same_email(self) -> None:
        email = "something@something.com"
        password = "something"
        payload = dict(email=email, password=password)
        UserFactory.create(email=email)
        with pytest.raises(ResourceConflictError):
            create_user(schema=payload)


class TestGetUser:
    def test_get_user(self) -> None:
        email = faker.safe_email()
        password = faker.password()
        hashed_password = generate_password_hash(password)
        user = UserFactory.create(email=email, password=hashed_password)

        user = get_user(email=email, password=password)
        assert user
        assert user.email == email
        assert user.password == hashed_password

    def test_get_user_email_not_found(self) -> None:
        email = faker.safe_email()
        password = faker.password()
        with pytest.raises(ResourceNotFound):
            get_user(email=email, password=password)

    def test_get_user_bad_password(self) -> None:
        email = faker.safe_email()
        password = faker.password()
        bad_password = password + "bad_password"
        hashed_password = generate_password_hash(password)
        user = UserFactory.create(email=email, password=hashed_password)
        with pytest.raises(AuthenticationError):
            get_user(email=email, password=bad_password)

    def test_get_user_by_email(self) -> None:
        email = "someone@gmail.com"
        user = UserFactory.create(email=email)
        assert get_user_by_email(email=email) == user

    def test_get_user_by_email(self) -> None:
        with pytest.raises(ResourceNotFound):
            get_user_by_email(email="someemail")
