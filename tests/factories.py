import factory
from faker import Faker

from app import db
from models.user import User, Coach, Student
from models.isa import ISA
from models.plaid_item import PlaidItem
from models.plaid_account import PlaidAccount
from common.constants import PlaidAccountType, PlaidDepositoryAccountSubtype

faker = Faker()
faker.seed_instance(4321)


class UserFactory(factory.alchemy.SQLAlchemyModelFactory):  # type: ignore
    class Meta:
        model = User
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = "commit"

    email = factory.Faker("email")
    password = factory.Faker("password")
    is_active = True
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    user_role = 0
    # date_of_birth = factory.Faker('date_between', start_date="-100", end_date="-10y")


class PlaidItemFactory(factory.alchemy.SQLAlchemyModelFactory):  # type: ignore
    class Meta:
        model = PlaidItem
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = "commit"

    user = factory.SubFactory(UserFactory)
    institution_id = factory.Faker("pystr", max_chars=8)
    item_id = factory.Faker("pystr", max_chars=50)


class PlaidAccountFactory(factory.alchemy.SQLAlchemyModelFactory):  # type: ignore
    class Meta:
        model = PlaidAccount
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = "commit"

    name = factory.Faker("word")
    plaid_type = PlaidAccountType.DEPOSITORY.value
    plaid_subtype = PlaidDepositoryAccountSubtype.CHECKING.value
    plaid_item = factory.SubFactory(PlaidItemFactory)
    current_balance = factory.Faker(
        "pydecimal", left_digits=5, right_digits=2, positive=True
    )
    account_id = factory.Faker("pystr", max_chars=50)
    user = factory.SubFactory(UserFactory)


class StudentFactory(UserFactory):
    class Meta:
        model = Student
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = "commit"


class CoachFactory(UserFactory):
    class Meta:
        model = Coach
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = "commit"


class ISAFactory(factory.alchemy.SQLAlchemyModelFactory):  # type: ignore
    class Meta:
        model = ISA
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = "commit"

    current_income = factory.Faker(
        "pydecimal", left_digits=5, right_digits=2, positive=True
    )
    percentage = factory.Faker("random_int", min=1, max=20, step=1)
    cap = factory.Faker("pydecimal", left_digits=5, right_digits=2, positive=True)
    time_to_be_paid = factory.Faker("random_int", min=1, max=1000, step=1)

    description = factory.Faker("word")
    status = factory.Faker("word")

    student = factory.SubFactory(StudentFactory)
    coach = factory.SubFactory(CoachFactory)
