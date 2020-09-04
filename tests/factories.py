import factory
from faker import Faker

from app import db
from models.user import User, Coach, Student
from models.isa import ISA, ISA_STATUS
from models.company import Company, CompanyStatus
from models.plaid_item import PlaidItem
from models.plaid_account import PlaidAccount
from models.subscription import Subscription
from models.feature_flag import FeatureFlag

from common.constants import PlaidAccountType, PlaidDepositoryAccountSubtype


faker = Faker()
faker.seed_instance(4321)


class CompanyFactory(factory.alchemy.SQLAlchemyModelFactory):  # type: ignore
    class Meta:
        model = Company
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = "commit"

    number_of_employees_estimate = factory.Faker("word")
    name = factory.Faker("word")
    address = factory.Faker("address")
    is_active = True
    status = CompanyStatus.ACTIVE.value


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

    # company = factory.SubFactory(CompanyFactory)


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
    cancellation_period_weeks = factory.Faker("random_int", min=0, max=10, step=1)

    description = factory.Faker("word")
    status = ISA_STATUS.INACTIVE.value

    student = factory.SubFactory(StudentFactory)
    coach = factory.SubFactory(CoachFactory)


class SubscriptionFactory(factory.alchemy.SQLAlchemyModelFactory):  # type: ignore
    class Meta:
        model = Subscription
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = "commit"

    is_active = True
    company = factory.SubFactory(CompanyFactory)


class FeatureFlagFactory(factory.alchemy.SQLAlchemyModelFactory):  # type: ignore
    class Meta:
        model = FeatureFlag
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = "commit"

    name = factory.Faker("word")
    value = False
