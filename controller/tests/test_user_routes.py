from app import app
from tests.factories import faker, UserFactory
from pytest_mock.plugin import MockFixture


class TestRegister:
    def test_login(self, mocker: MockFixture) -> None:
        with app.test_client() as client:
            email = faker.safe_email()
            password = faker.password()
            # login a user
            resp = client.post("/login", json=dict(email=email, password=password))
            assert resp.status_code == 204

    def test_register(self) -> None:
        with app.test_client() as client:
            email = faker.safe_email()
            password = faker.password()
            # register a user
            resp = client.post("/register", json=dict(email=email, password=password))
            assert resp.status_code == 200

    def test_register_bad_email(self) -> None:
        with app.test_client() as client:
            email = "something@"
            password = faker.password()
            resp = client.post("/register", json=dict(email=email, password=password))
            assert resp.status_code == 400

    def test_register_no_password(self) -> None:
        with app.test_client() as client:
            email = "something@something1.com"
            password = None
            resp = client.post("/register", json=dict(email=email, password=password))
            assert resp.status_code == 400

    def test_register_no_email(self) -> None:
        with app.test_client() as client:
            email = None
            password = faker.password()
            resp = client.post("/register", json=dict(email=email, password=password))
            assert resp.status_code == 400

    def test_register_same_email(self) -> None:
        with app.test_client() as client:
            email = faker.safe_email()
            password = faker.password()
            user = UserFactory.create(email=email)
            resp = client.post("/register", json=dict(email=email, password=password))
            assert resp.status_code == 409
