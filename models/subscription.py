from typing import Any
from app import db
from common.database import db_session
from datetime import datetime


class Subscription(db.Model):  # type: ignore
    __tablename__ = "subscriptions"
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(), onupdate=datetime.utcnow)

    is_active = db.Column(db.Boolean(), nullable=False, default=True)

    company_id = db.Column(
        db.Integer, db.ForeignKey("companies.id", ondelete="CASCADE"), nullable=True
    )

    company = db.relationship("Company", backref="subscriptions")

    @classmethod
    def get_subscription_by_id(cls, subscription_id: int) -> "Subscription":
        with db_session() as session:
            subscription = (
                session.query(cls).filter(cls.id == subscription_id).one_or_none()
            )  # type: Subscription
            return subscription

    @classmethod
    def get_subscription_by_company_id(cls, company_id: int) -> "Subscription":
        with db_session() as session:
            subscription = (
                session.query(cls).filter(cls.company_id == company_id).one_or_none()
            )  # type: Subscription
            return subscription

    @classmethod
    def create_subscription(cls, **args: str) -> "Subscription":
        with db_session() as session:
            subscription = cls(**args)
            session.add(subscription)
            session.commit()
            return subscription

    def update_subscription(self, **kwargs: Any) -> "Subscription":
        with db_session() as session:
            for key, value in kwargs.items():
                setattr(self, key, value)
                session.commit()

        return self.get_subscription_by_id(subscription_id=self.id)

    def delete(self) -> None:
        with db_session() as session:
            session.delete(self)
            session.commit()
