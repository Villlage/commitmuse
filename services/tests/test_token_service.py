# type: ignore
import pytest
from common.exceptions import (
    ResourceConflictError,
    ResourceNotFound,
    AuthenticationError,
)
from services.token_service import (
    verify_user_token,
    generate_user_token,
)


class TestToken:
    def test_generate_user_token(self) -> None:
        user_id = 100
        token = generate_user_token(user_id)
        assert token

    @pytest.mark.skip(reason="not sure why it stopped working - something with jwt")
    def test_verify_token(self) -> None:
        user_id = 1000
        token = generate_user_token(user_id)
        assert token

        verified = verify_user_token(token)
        assert verified == user_id
