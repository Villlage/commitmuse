from typing import List, Dict, Optional, Any
from datetime import datetime
from app import db
from common.database import db_session
from flask_login import UserMixin
from enum import Enum
from datadog import statsd


class UserRole(Enum):
    REGULAR = 0
    ADMIN = 1
    COMPANY_ADMIN = 2


class UserType(Enum):
    STUDENT = "student"
    COACH = "coach"
    COMPANY_ADMIN = "company_admin"
    ADMIN = "admin"


class User(db.Model, UserMixin):  # type: ignore
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), onupdate=datetime.utcnow)
    user_role = db.Column(db.Integer, nullable=False, default=0)

    password = db.Column(db.String(255), nullable=True, server_default="")

    email = db.Column(db.String(255), nullable=False, unique=True)
    confirmed_at = db.Column(db.DateTime())

    is_active = db.Column(db.Boolean(), nullable=False, default=True)
    first_name = db.Column(db.String(255), nullable=False, server_default="")
    last_name = db.Column(db.String(255), nullable=False, server_default="")

    type = db.Column(db.String(20))

    company_id = db.Column(db.Integer, db.ForeignKey("companies.id"), nullable=True)

    company = db.relationship("Company", backref="users")

    __mapper_args__ = {"polymorphic_identity": "users", "polymorphic_on": type}

    @classmethod
    def get_user(cls, user_id: int) -> Optional["User"]:
        with db_session() as session:
            user = (
                session.query(cls).filter(cls.id == user_id).one_or_none()
            )  # type: Optional[User]
            return user

    @classmethod
    def create_user(cls, **args: str) -> "User":
        with db_session() as session:
            user = cls(**args)
            session.add(user)
            session.commit()
            statsd.increment("users.create")
            return user

    @classmethod
    def get_users(cls, user_ids: List[int] = []) -> List["User"]:
        if not user_ids:
            raise Exception("no user ids provided")
        with db_session() as session:
            users = (
                session.query(cls).filter(cls.id.in_(user_ids)).all()
            )  # type: List[User]
            return users

    @classmethod
    def get_user_by_email(cls, email: str) -> Optional["User"]:
        with db_session() as session:
            user = (
                session.query(cls).filter(cls.email == email).one_or_none()
            )  # type: Optional[User]
            return user

    def update_user(self, attributes: Dict[str, Any]) -> "User":
        with db_session() as session:
            for key, value in attributes.items():
                setattr(self, key, value)

            session.add(self)
            session.commit()
            return self

    def deactivate(self) -> "User":
        with db_session() as session:
            self.is_active = False
            session.add(self)
            session.commit()
            return self

    def is_admin(self) -> bool:
        is_admin = self.user_role == 1  # type: bool
        return is_admin

    @classmethod
    def get_all_users(cls) -> List["User"]:
        with db_session() as session:
            users = session.query(cls).all()  # type: List[User]
            return users

    def user_type(self) -> str:
        """
        return the user type based on type and role
        """
        if self.user_role == UserRole.ADMIN.value:
            return UserType.ADMIN.value

        elif self.user_role == UserRole.COMPANY_ADMIN.value:
            return UserType.COMPANY_ADMIN.value

        elif self.user_role == UserRole.REGULAR.value and self.type == "coaches":
            return UserType.COACH.value

        return UserType.STUDENT.value


class Coach(User):
    __tablename__ = "coaches"
    id = db.Column(db.Integer, primary_key=True)

    __mapper_args__ = {
        "polymorphic_identity": "coaches",
    }

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User", backref="coaches")


class Student(User):
    __tablename__ = "students"
    id = db.Column(db.Integer, primary_key=True)

    __mapper_args__ = {
        "polymorphic_identity": "students",
    }

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User", backref="students")
