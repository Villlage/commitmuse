from typing import Type, Optional

import flask_cors
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from sqlalchemy import MetaData
from flask_login import LoginManager
import logging

from common.flask_help import SecureCookieSession
from config import (
    LocalConfig,
    TestingConfig,
    StagingConfig,
    ProductionConfig,
    client_build_dir,
)


DEVELOPMENT = "development"
TESTING = "testing"
STAGING = "staging"
PRODUCTION = "production"


app = Flask(
    __name__,
    static_folder="./client/dist",
    template_folder="./" + client_build_dir,  #  type: ignore
)  # type: Flask
app.session_interface = SecureCookieSession()

config_map = {
    DEVELOPMENT: LocalConfig,
    TESTING: TestingConfig,
    STAGING: StagingConfig,
    PRODUCTION: ProductionConfig,
}

config = config_map[app.env]  # type: ignore
app.config.from_object(config)

flask_cors.CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

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
    return logger


def get_env() -> Optional[str]:
    return app.env


metadata = MetaData(naming_convention=convention)  # # type: MetaData
db = SQLAlchemy(app, metadata=metadata)  # type: SQLAlchemy
login_manager = LoginManager()  # type: LoginManager
login_manager.init_app(app)
migrate = Migrate(app, db)  # type: Migrate
ma = Marshmallow(app)  # type: Marshmallow
logger = _get_logger(config.LOG_LEVEL)  # type: logging.Logger


# Models
from models.user import User
from models.plaid_item import PlaidItem
from models.plaid_account import PlaidAccount
from models.isa import ISA
from models.company import Company


# Routes
import controller.user_routes
import controller.react_routes
import controller.plaid_routes
import controller.isa_routes
import controller.company_routes
import controller.admin.admin_user_routes
import controller.admin.admin_isa_routes
