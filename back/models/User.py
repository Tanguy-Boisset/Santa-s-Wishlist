from sqlalchemy import Table
from sqlalchemy.sql import select
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from config import engine

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, autoincrement = True, primary_key=True)
    name = db.Column(db.String)
    surname = db.Column(db.String)
    pseudo = db.Column(db.String)
    password = db.Column(db.String)

userTable = Table('user', User.metadata)

def create_user_table():
    User.metadata.create_all(engine)


def delete_user_table():
    User.metadata.drop_all(engine)


def add_user(name, surname, pseudo, plain_password):

    hashed_password = generate_password_hash(plain_password, method='sha256')

    insert_stmt = userTable.insert().values(
        name=name,
        surname=surname,
        password=hashed_password,
    )
    conn = engine.connect()
    conn.execute(insert_stmt)
    conn.close()


def update_password(id, plain_password):

    hashed_password = generate_password_hash(plain_password, method='sha256')

    update = userTable.update().\
        values(password=hashed_password).\
        where(userTable.c.id == id)

    conn = engine.connect()
    conn.execute(update)
    conn.close()

def is_in_database(id):
    return bool(User.query.filter_by(id=id).first())
