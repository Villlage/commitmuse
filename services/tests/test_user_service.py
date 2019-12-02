# type: ignore
import pytest
from werkzeug.security import check_password_hash
from common.exceptions import ValidationError, ResourceConflictError
from tests.factories import UserFactory
from services.user_service import create_user


class TestCreateUser:
    def test_create_user(self) -> None:
        email = "something@something.com"
        password = "something"
        user = create_user(email=email, password=password)
        assert user.email == email
        assert check_password_hash(user.password, password)

    def test_create_user_bad_email(self) -> None:
        email = "something@"
        password = "something"
        with pytest.raises(ValidationError):
            create_user(email=email, password=password)

    def test_create_user_same_email(self) -> None:
        email = "something@something.com"
        password = "something"
        UserFactory.create(email=email)
        with pytest.raises(ResourceConflictError):
            create_user(email=email, password=password)
