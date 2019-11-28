from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from sqlalchemy import MetaData
import logging
from config import LocalConfig, TestingConfig, StagingConfig, ProductionConfig


DEVELOPMENT = "development"
TESTING = "testing"
STAGING = "staging"
PRODUCTION = "production"


app = Flask(__name__, static_folder="./client/dist", template_folder="./client/build")

config_map = {
    DEVELOPMENT: LocalConfig,
    TESTING: TestingConfig,
    STAGING: StagingConfig,
    PRODUCTION: ProductionConfig,
}
config = config_map[app.env]
app.config.from_object(config)

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}


def _get_logger(log_level: str) -> logging.Logger:
    logging.basicConfig(
        level=log_level, format="%(asctime)s - %(levelname)s - %(message)s"
    )
    logger = logging.getLogger(__name__)
    print(logger)
    return logger


metadata = MetaData(naming_convention=convention)
db = SQLAlchemy(app, metadata=metadata)
migrate = Migrate(app, db)
ma = Marshmallow(app)
logger = _get_logger(config.LOG_LEVEL)


import controller.user_routes
