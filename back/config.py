from sqlalchemy import create_engine
import os

DATABASE_CONFIG = 'sqlite:///data.db'
engine = create_engine(DATABASE_CONFIG)