from sqlalchemy import create_engine
import os

DATABASE_CONFIG = 'sqlite:///data/data.db'
JWT_SECRET_KEY = os.urandom(24)

engine = create_engine(DATABASE_CONFIG)