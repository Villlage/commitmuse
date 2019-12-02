from app import app
from tests.factories import faker
from pytest_mock.plugin import MockFixture


class TestRegister:
    def test_login(self, mocker: MockFixture) -> None:
        with app.test_client() as client:
            email = faker.safe_email()
            password = faker.password()
            # register a user
            resp = client.post("/login", json=dict(email=email, password=password))
            assert resp.status_code == 204
