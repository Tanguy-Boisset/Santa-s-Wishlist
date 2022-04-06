from sqlalchemy import create_engine
import os

DATABASE_CONFIG = 'sqlite:///data.db'
# JWT_SECRET_KEY = os.urandom(24)
JWT_SECRET_KEY = "passwordsafe".encode()

engine = create_engine(DATABASE_CONFIG)