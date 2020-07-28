# type: ignore
import pytest
from tests.factories import CoachFactory, ISAFactory
from conftest import logged_in_client
from common.exceptions import ResourceNotFound
from services.isa_service import get_isa_by_id


class TestISA:
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
        )

        with logged_in_client(coach) as client:
            resp = client.post(f"/isas", json=payload)
            assert resp.status_code == 200
            assert resp.json["current_income"] == payload["current_income"]
            assert resp.json["percentage"] == payload["percentage"]
            assert resp.json["cap"] == payload["cap"]
            assert resp.json["time_to_be_paid"] == payload["time_to_be_paid"]
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
        isa_id = isa.id

        description = "something else"
        payload = dict(description=description)

        with logged_in_client(coach) as client:
            resp = client.patch(f"/isas/{isa_id}", json=payload)
            assert resp.status_code == 200
            assert resp.json["cap"] == isa.cap
            assert resp.json["description"] == description

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