# type: ignore
import pytest


from third_party.docusign.client import docusign_client
from tests.factories import ISAFactory
from unittest.mock import MagicMock


class TestPlaidClient:
    @pytest.fixture()
    def mock_send_envelope(self, mocker):
        return mocker.patch(
            "docusign_esign.EnvelopesApi.create_envelope",
            return_value=MagicMock(envelope_id=123),
        )

    def test_send_envelope(self, mock_send_envelope) -> None:
        isa = ISAFactory.create()
        res = docusign_client.send_envelope(coach=isa.coach, student=isa.student)
        assert res == dict(envelope_id=123)
        mock_send_envelope.assert_called_once()
