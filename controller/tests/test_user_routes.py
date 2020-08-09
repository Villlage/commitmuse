from app import app
from tests.factories import faker, UserFactory
from conftest import logged_in_client  # type: ignore
from werkzeug.security import generate_password_hash

# from services.token_service import generate_user_token, verify_user_token


class TestRegister:
    def test_register(self) -> None:
        with app.test_client() as client:
            email = faker.safe_email()
            password = faker.password()
            first_name = faker.word()
            last_name = faker.word()
            # register a user
            resp = client.post(
                "/register",
                json=dict(
                    email=email,
                    password=password,
                    last_name=last_name,
                    first_name=first_name,
                ),
            )
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


class TestLogin:
    def test_login(self) -> None:
        with app.test_client() as client:
            email = faker.safe_email()
            password = faker.password()
            hashed_password = generate_password_hash(password)
            user = UserFactory.create(email=email, password=hashed_password)
            # login a user
            resp = client.post("/login", json=dict(email=email, password=password))
            assert resp.status_code == 200

    def test_login_bad_email(self) -> None:
        with app.test_client() as client:
            email = "something@"
            password = faker.password()
            # login a user
            resp = client.post("/login", json=dict(email=email, password=password))
            assert resp.status_code == 400

    def test_email_not_registered(self) -> None:
        with app.test_client() as client:
            email = faker.safe_email()
            password = faker.password()
            # login a user
            resp = client.post("/login", json=dict(email=email, password=password))
            assert resp.status_code == 404

    def test_bad_password(self) -> None:
        with app.test_client() as client:
            email = faker.safe_email()
            password = faker.password()
            hashed_password = generate_password_hash(password)
            bad_password = password + "bad"
            user = UserFactory.create(email=email, password=hashed_password)
            # login a user
            resp = client.post("/login", json=dict(email=email, password=bad_password))
            assert resp.status_code == 403


class TestLogOut:
    def test_logout(self) -> None:
        user = UserFactory.create()
        with logged_in_client(user) as client:
            resp = client.get("/logout")
            assert resp.status_code == 200

    def test_logout_unauthenticated_user(self) -> None:
        with app.test_client() as client:
            resp = client.get("/logout")
            assert resp.status_code == 401


class TestUser:
    def test_user_route(self) -> None:
        user = UserFactory.create()
        with logged_in_client(user) as client:
            resp = client.get("/user")
            assert resp.status_code == 200
            assert resp.json["first_name"] == user.first_name


class TestResetPassword:
    def test_reset_password_success(self) -> None:
        user = UserFactory.create()
        # token = generate_user_token(user.id)
        token = user.id
        with app.test_client() as client:
            resp = client.patch(
                "/users/reset-password",
                json=dict(token=f"{token}", password="someNewPassword"),
            )
            assert resp.status_code == 200

    # def test_reset_password_failure_invalid_token(self) -> None:
    #     #token = "clearlyBadToken"
    #     token = "10000"
    #     with app.test_client() as client:
    #         resp = client.patch(
    #             "/users/reset-password",
    #             json=dict(token=f"{token}", password="someNewPassword"),
    #         )
    #         assert resp.status_code == 403

    def test_reset_password_failure_no_user(self) -> None:
        user = UserFactory.create()
        user.id + 1
        # token = generate_user_token(bad_user_id)
        token = "10000"
        with app.test_client() as client:
            resp = client.patch(
                "/users/reset-password",
                json=dict(token=f"{token}", password="someNewPassword"),
            )
            assert resp.status_code == 404

    def test_reset_password_failure(self) -> None:
        UserFactory.create()
        # token = generate_user_token(user.id)
        token = "10000"
        with app.test_client() as client:
            resp = client.patch("/users/reset-password", json=dict(token=f"{token}"))
            assert resp.status_code == 400


class TestUserUpdate:
    def test_update(self) -> None:
        user = UserFactory.create(first_name="something")
        first_name = "something else"
        with logged_in_client(user) as client:
            resp = client.patch("/user", json=dict(first_name=first_name))
            assert resp.status_code == 200
            assert resp.json["first_name"] == first_name
