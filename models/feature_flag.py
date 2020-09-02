from common.database import db_session
from app import db
from typing import Optional, List


send_document = "send_document"


class FeatureFlag(db.Model):  # type: ignore
    __tablename__ = "feature_flags"

    name = db.Column(db.String(50), primary_key=True, autoincrement=False, index=True)
    value = db.Column(db.Boolean, nullable=False, default=False)


def get_all_feature_flags() -> List["FeatureFlag"]:
    with db_session() as session:
        feature_flags = session.query(FeatureFlag).all()  # type: List["FeatureFlag"]
        return feature_flags


def get_feature_flag_by_name(
    name: str, default: Optional[bool] = None
) -> Optional[bool]:
    with db_session() as session:
        feature_flag = (
            session.query(FeatureFlag).filter(FeatureFlag.name == name).one_or_none()
        )  # type: FeatureFlag
    if feature_flag is None:
        return default
    else:
        boolean = feature_flag.value  # type: bool
        return boolean
