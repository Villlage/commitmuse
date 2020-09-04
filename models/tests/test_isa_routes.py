# type: ignore
import pytest
from app import app
from tests.factories import CoachFactory, ISAFactory
from conftest import logged_in_client
from common.exceptions import ResourceNotFound
from services.isa_service import get_isa_by_id
from unittest.mock import MagicMock


class TestISA:
    @pytest.fixture()
    def mock_send_document(self, mocker):
        return mocker.patch("services.documents_service.docusign_client.send_envelope",)

    def test_get_all(self) -> None:
        coach = CoachFactory.create()
        isa1 = ISAFactory.create(coach=coach)
        isa2 = ISAFactory.create(coach=coach)
        with logged_in_client(coach) as client:
            resp = client.get("/isas")

            assert resp.status_code == 200
            assert len(resp.json) == 2

    def test_create(self) -> None:
        coach = CoachFactory.create()

        payload = dict(
            current_income=100000,
            percentage=17.0,
            cap=10000,
            time_to_be_paid=24,
            description="becoming a product manager",
            coach_id=coach.id,
            cancellation_period_weeks=2,
            industry_field="Information technology",
            program_duration_weeks=4,
            expiration_period_months=3,
            client=dict(
                email="client@gmail.com", first_name="client", last_name="student"
            ),
        )

        with logged_in_client(coach) as client:
            resp = client.post(f"/isas", json=payload)
            assert resp.status_code == 200
            assert resp.json["current_income"] == payload["current_income"]
            assert resp.json["percentage"] == payload["percentage"]
            assert resp.json["cap"] == payload["cap"]
            assert resp.json["time_to_be_paid"] == payload["time_to_be_paid"]
            assert resp.json["industry_field"] == payload["industry_field"]
            assert (
                resp.json["expiration_period_months"]
                == payload["expiration_period_months"]
            )
            assert (
                resp.json["program_duration_weeks"] == payload["program_duration_weeks"]
            )
            assert resp.json["id"]

    def test_bad_create(self) -> None:
        coach = CoachFactory.create()
        payload = dict(
            project_address="250 1st avenue 4e 10009", description="hello there",
        )

        with logged_in_client(coach) as client:
            resp = client.post("/isas", json=payload)
            assert resp.status_code == 400

    def test_update(self) -> None:
        coach = CoachFactory.create()
        isa = ISAFactory.create(coach=coach)
        student = isa.student
        isa_id = isa.id

        description = "something else"
        payload = dict(description=description)

        with logged_in_client(coach) as client:
            resp = client.patch(f"/isas/{isa_id}", json=payload)
            assert resp.status_code == 200
            assert resp.json["cap"] == isa.cap
            assert resp.json["description"] == description
            assert resp.json["student"]
            assert resp.json["student"]["email"] == student.email

    @pytest.mark.skip(
        reason="need to change it to include user_id as well in the function"
    )
    def test_bad_update_autherization(self) -> None:
        coach1 = CoachFactory.create()
        coach2 = CoachFactory.create()
        isa = ISAFactory.create(coach=coach1)
        isa_id = isa.id

        description = "new isa"
        payload = dict(description=description)

        with logged_in_client(coach2) as client:
            resp = client.patch(f"/isas/{isa_id}", json=payload)
            assert resp.status_code == 403

    def test_bad_update_not_found(self) -> None:
        coach = CoachFactory.create()
        isa = ISAFactory.create(coach=coach)
        isa_id = isa.id + 1

        description = "isa description"
        payload = dict(description=description)

        with logged_in_client(coach) as client:
            resp = client.patch(f"/isas/{isa_id}", json=payload)
            assert resp.status_code == 404

    def test_get_isa_by_id(self) -> None:
        coach = CoachFactory.create()
        isa = ISAFactory.create(coach=coach)
        isa_id = isa.id

        with logged_in_client(coach) as client:
            resp = client.get(f"/isas/{isa_id}")
            assert resp.status_code == 200
            assert resp.json["description"] == isa.description

    def test_delete(self) -> None:
        coach = CoachFactory.create()
        isa = ISAFactory.create(coach=coach)
        isa_id = isa.id

        with logged_in_client(coach) as client:
            resp = client.delete(f"/isas/{isa_id}")
            assert resp.status_code == 204

        with pytest.raises(ResourceNotFound):
            assert get_isa_by_id(coach_id=coach.id, isa_id=isa_id)

    def test_get_isa_by_access_token(self) -> None:
        isa = ISAFactory.create()
        isa_id = isa.id

        with app.test_client() as client:
            resp = client.get(f"/client/isas/{isa_id}")
            assert resp.status_code == 200
            assert resp.json["id"] == isa_id


class TestSigning:
    @pytest.fixture()
    def mock_embedded_signing(self, mocker):
        return mocker.patch(
            "controller.isa_routes.docusign_client.embedded_signing",
            return_value=MagicMock(url="url"),
        )

    def test_sign_isa(self, mock_embedded_signing) -> None:
        coach = CoachFactory.create()
        isa = ISAFactory.create(coach=coach)
        isa_id = isa.id

        with logged_in_client(coach) as client:
            resp = client.get(f"/isas/{isa_id}/sign")
            assert resp.status_code == 200
            assert resp.json["url"] == "url"
            mock_embedded_signing.assert_called_once()
