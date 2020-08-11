from typing import Any, List
from datetime import datetime
from app import db
from enum import Enum
from common.database import db_session


class CompanyStatus(Enum):
    ACTIVE = "active"
    IN_REVIEW = "in_review"
    INACTIVE = "inactive"


class Company(db.Model):  # type: ignore
    __tablename__ = "companies"
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), onupdate=datetime.utcnow)

    number_of_employees_estimate = db.Column(
        db.String(255), nullable=True, server_default=""
    )
    name = db.Column(db.String(255), nullable=False, server_default="")
    address = db.Column(db.String(255), nullable=False, server_default="")

    is_active = db.Column(db.Boolean(), nullable=False, default=True)
    status = db.Column(
        db.String(255), nullable=False, server_default=CompanyStatus.ACTIVE.value
    )

    @classmethod
    def get_company_by_id(cls, company_id: int) -> "Company":
        with db_session() as session:
            company = (
                session.query(cls).filter(cls.id == company_id).one_or_none()
            )  # type: Company
            return company

    @classmethod
    def create_company(cls, **args: str) -> "Company":
        with db_session() as session:
            company = cls(**args)
            session.add(company)
            session.commit()
            return company

    def update_company(self, **kwargs: Any) -> "Company":
        with db_session() as session:
            for key, value in kwargs.items():
                setattr(self, key, value)
                session.commit()

        return self.get_company_by_id(company_id=self.id)

    def delete(self) -> None:
        with db_session() as session:
            session.delete(self)
            session.commit()

    @classmethod
    def get_all(cls) -> List["Company"]:
        with db_session() as session:
            companies = session.query(cls).all()  # type: List[Company]
            return companies
