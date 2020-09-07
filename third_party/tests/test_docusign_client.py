# type: ignore
import pytest
from conftest import logged_in_docusign_client
from third_party.docusign.client import docusign_client
from tests.factories import ISAFactory
from unittest.mock import MagicMock


@pytest.mark.skip("trying something new")
class TestPlaidClient:
    @pytest.fixture()
    def mock_send_envelope(self, mocker):
        return mocker.patch(
            "docusign_esign.EnvelopesApi.create_envelope",
            return_value=MagicMock(envelope_id=123),
        )

    @pytest.fixture()
    def mock_create_recipient_view(self, mocker):
        return mocker.patch(
            "docusign_esign.EnvelopesApi.create_recipient_view",
            return_value=MagicMock(envelope_id=123),
        )

    def test_send_envelope(self) -> None:
        isa = ISAFactory.create()
        res = docusign_client.send_envelope(coach=isa.coach, student=isa.student)
        assert res == dict(envelope_id=123)
        # mock_send_envelope.assert_called_once()

    def test_embedded(self, mock_send_envelope, mock_create_recipient_view) -> None:
        isa = ISAFactory.create()
        coach = isa.coach
        company_name = "Hello Inc"
        isa.student
        with logged_in_docusign_client(coach) as client:
            res = docusign_client.embedded_signing(
                user=coach, isa=isa, company_name=company_name
            )
            mock_send_envelope.assert_called_once()
            mock_create_recipient_view.assert_called_once()
