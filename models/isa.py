from typing import Any, List
from datetime import datetime
from app import db
from common.database import db_session

from enum import Enum


class ISA_STATUS(Enum):
    INACTIVE = "inactive"
    SIGNED_BY_COMPANY = "signed_by_company"
    ACTIVE = "active"


class ISA(db.Model):  # type: ignore
    __tablename__ = "isas"
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), onupdate=datetime.utcnow)

    current_income = db.Column(db.Integer, nullable=False, default=0)
    percentage = db.Column(db.Float, nullable=False, default=0)
    cap = db.Column(db.Integer, nullable=False, default=0)
    cancellation_period_weeks = db.Column(db.Integer, nullable=False, default=0)
    # expiration_period_months = db.Column(db.Integer, nullable=True, default=0)

    time_to_be_paid = db.Column(db.Integer, nullable=False, default=0)

    industry_field = db.Column(db.String(255), nullable=True, default="")
    program_duration_weeks = db.Column(db.Integer, nullable=True, default=0)
    description = db.Column(db.String(2047), nullable=False, server_default="")

    status = db.Column(
        db.String(255), nullable=False, server_default=ISA_STATUS.INACTIVE.value
    )

    coach_id = db.Column(
        db.Integer, db.ForeignKey("coaches.id", ondelete="CASCADE"), nullable=True
    )

    student_id = db.Column(
        db.Integer, db.ForeignKey("students.id", ondelete="CASCADE"), nullable=True
    )

    coach = db.relationship("Coach", backref="isas")
    student = db.relationship("Student", backref="isas")

    @classmethod
    def get_isa_by_id(cls, isa_id: int) -> "ISA":
        with db_session() as session:
            isa = session.query(cls).filter(cls.id == isa_id).one_or_none()  # type: ISA
            return isa

    @classmethod
    def get_isa_by_coach_id(cls, coach_id: int) -> "ISA":
        with db_session() as session:
            isa = session.query(cls).filter(cls.coach_id == coach_id).all()  # type: ISA
            return isa

    @classmethod
    def create_isa(cls, **args: str) -> "ISA":
        with db_session() as session:
            isa = cls(**args)
            session.add(isa)
            session.commit()
            return isa

    def update_isa(self, **kwargs: Any) -> "ISA":
        with db_session() as session:
            for key, value in kwargs.items():
                setattr(self, key, value)
                session.commit()

        return self.get_isa_by_id(isa_id=self.id)

    def delete(self) -> None:
        with db_session() as session:
            session.delete(self)
            session.commit()

    @classmethod
    def get_all_isas(cls) -> List["ISA"]:
        with db_session() as session:
            isas = session.query(cls).all()  # type: List[ISA]
            return isas
