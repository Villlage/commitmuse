import factory
from faker import Faker

from app import db
from models.user import User

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
