import os

class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') 
    DEBUG = False
    TESTING = False
    LOG_LEVEL = "INFO"
 

class LocalConfig(Config):
    DEBUG = True
    LOG_LEVEL = "DEBUG"
    SQLALCHEMY_DATABASE_URI = 'postgres://localhost/village'


class TestingConfig(Config):
    ENV = 'testing'
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://localhost/test'


class StagingConfig(Config):
    LOG_LEVEL = "INFO"

class ProductionConfig(Config):
    LOG_LEVEL = "INFO"