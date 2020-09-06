from models.user import User, UserType
from tests.factories import UserFactory, CoachFactory, StudentFactory


class TestUser:
    def test_get_user(self) -> None:
        user = UserFactory.create()
        res = User.get_user(user.id)
        assert user == res

    def test_create_user(self) -> None:
        email = "email@gmail.com"
        password = "password"
        args = dict(email=email, password=password)
        user = User.create_user(**args)
        assert user.email == email
        assert user.password == password

    def test_get_users(self) -> None:
        user1 = UserFactory.create()
        user2 = UserFactory.create()
        UserFactory.create()
        res = User.get_users([user1.id, user2.id])
        assert res
        assert len(res) == 2
        assert set([user1.id, user2.id]) == set(u.id for u in res)

    def test_is_active(self) -> None:
        user = UserFactory.create()
        assert user.is_active == True
        user.deactivate()
        assert user.is_active == False


class TestUserType:
    def test_is_admin(self) -> None:
        user = UserFactory.create()
        assert user.is_admin() == False

    def test_user_type_coach(self) -> None:
        coach = CoachFactory.create()
        assert coach.user_type() == UserType.COACH.value

    def test_user_type_student(self) -> None:
        coach = StudentFactory.create()
        assert coach.user_type() == UserType.STUDENT.value

    def test_user_type_admin(self) -> None:
        admin_user = UserFactory.create(user_role=1)
        assert admin_user.user_type() == UserType.ADMIN.value

    def test_user_type_company_admin(self) -> None:
        company_admin_user = CoachFactory.create(user_role=2)
        assert company_admin_user.user_type() == UserType.COMPANY_ADMIN.value
