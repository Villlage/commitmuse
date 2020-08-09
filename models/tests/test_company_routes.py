# type: ignore
import pytest
from tests.factories import CoachFactory, CompanyFactory
from conftest import logged_in_client
from common.exceptions import ResourceNotFound
from services.company_service import get_company_by_id


class TestCompany:
    def test_create(self) -> None:
        coach = CoachFactory.create()

        payload = dict(
            number_of_employees_estimate="1-50",
            name="Company Inc.",
            address="250 1st Avenue 4E NY, NY, 10009",
        )

        with logged_in_client(coach) as client:
            resp = client.post(f"/companies", json=payload)
            assert resp.status_code == 200
            assert (
                resp.json["number_of_employees_estimate"]
                == payload["number_of_employees_estimate"]
            )
            assert resp.json["name"] == payload["name"]
            assert resp.json["address"] == payload["address"]

    def test_bad_create(self) -> None:
        coach = CoachFactory.create()
        payload = dict(hello="250 1st avenue 4e 10009")

        with logged_in_client(coach) as client:
            resp = client.post("/companies", json=payload)
            assert resp.status_code == 400

    def test_update(self) -> None:
        company = CompanyFactory.create()
        coach = CoachFactory.create(company=company)
        company_id = company.id

        name = "something else"
        payload = dict(name=name)

        with logged_in_client(coach) as client:
            resp = client.patch(f"/companies/{company_id}", json=payload)
            assert resp.status_code == 200
            assert resp.json["name"] == name
            assert resp.json["address"] == company.address

    def test_bad_update_autherization(self) -> None:
        company = CompanyFactory.create()
        good_coach = CoachFactory.create(company=company)
        bad_coach = CoachFactory.create()
        company_id = company.id

        name = "new name"
        payload = dict(name=name)

        with logged_in_client(bad_coach) as client:
            resp = client.patch(f"/companies/{company_id}", json=payload)
            assert resp.status_code == 403

    def test_bad_update_not_found(self) -> None:
        company = CompanyFactory.create()
        coach = CoachFactory.create(company=company)
        company_id = company.id + 1

        name = "new company name"
        payload = dict(name=name)

        with logged_in_client(coach) as client:
            resp = client.patch(f"/companies/{company_id}", json=payload)
            assert resp.status_code == 404

    def test_get_company_by_id(self) -> None:
        company = CompanyFactory.create()
        coach = CoachFactory.create(company=company)
        company_id = company.id

        with logged_in_client(coach) as client:
            resp = client.get(f"/companies/{company_id}")
            assert resp.status_code == 200
            assert resp.json["name"] == company.name

    def test_delete(self) -> None:
        company = CompanyFactory.create()
        coach = CoachFactory.create(company=company)
        company_id = company.id

        with logged_in_client(coach) as client:
            resp = client.delete(f"/companies/{company_id}")
            assert resp.status_code == 204

        with pytest.raises(ResourceNotFound):
            assert get_company_by_id(user=coach, company_id=company_id)


class TestCompanyDashboard:
    def test_copmany_isas(self) -> None:
        company = CompanyFactory.create()
        coach = CoachFactory.create(company=company)
        company_id = company.id

        with logged_in_client(coach) as client:
            resp = client.get(f"companies/{company_id}/isas")
            assert resp.status_code == 200

    def test_copmany_coaches(self) -> None:
        company = CompanyFactory.create()
        coach = CoachFactory.create(company=company)
        company_id = company.id

        with logged_in_client(coach) as client:
            resp = client.get(f"companies/{company_id}/coaches")
            assert resp.status_code == 200

    def test_copmany_overview(self) -> None:
        company = CompanyFactory.create()
        coach = CoachFactory.create(company=company)
        company_id = company.id

        with logged_in_client(coach) as client:
            resp = client.get(f"companies/{company_id}/overview")
            assert resp.status_code == 200
