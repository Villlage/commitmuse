from models.company import Company, CompanyStatus
from tests.factories import CompanyFactory


class TestCompany:
    def test_get_company_by_id(self) -> None:
        company = CompanyFactory.create()
        res = company.get_company_by_id(company.id)
        assert company == res

    def test_create_company(self) -> None:
        arguments = dict(
            number_of_employees_estimate="1-50",
            name="Company Inc.",
            address="250 1st Avenue 4E NY, NY, 10009",
        )

        company = Company.create_company(**arguments)

        assert company
        assert (
            company.number_of_employees_estimate
            == arguments["number_of_employees_estimate"]
        )
        assert company.name == arguments["name"]
        assert company.address == arguments["address"]
        assert company.is_active == True
        assert company.status == CompanyStatus.ACTIVE.value

    def test_update(self) -> None:
        company = CompanyFactory.create()
        name = "other company inc"
        old_address = company.address
        update_args = dict(name=name)
        company = company.update_company(**update_args)
        assert company
        assert company.name == name
        assert company.address == old_address
