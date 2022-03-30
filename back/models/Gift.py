from sqlalchemy import Table
from sqlalchemy.sql import select
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from config import engine

db = SQLAlchemy()


class Gift(db.Model):
    id = db.Column(db.Integer, autoincrement = True, primary_key=True)
    id_wishlist = db.Column(db.Integer)
    name = db.Column(db.String)
    url = db.Column(db.String)
    price = db.Column(db.Integer)
    description = db.Column(db.String)
    state = db.Column(db.String)
    id_user_who_offer = db.Column(db.Integer, nullable=True)


GiftsTable = Table('gift', Gift.metadata)


def create_GiftsTable():
    Gift.metadata.create_all(engine)


def delete_GiftsTable():
    Gift.metadata.drop_all(engine)

def add_Gift(id_wishlist, name, url, price, description, state, id_user_who_offer):

    insert_stmt = GiftsTable.insert().values(
        id_wishlist=id_wishlist,
        name=name,
        url=url,
        price=price,
        description=description,
        state=state,
        id_user_who_offer=id_user_who_offer
    )
    conn = engine.connect()
    conn.execute(insert_stmt)
    conn.close()

def update_Gift(id, id_wishlist, name, url, price, description, state, id_user_who_offer):

    update = GiftsTable.update().\
        values(
            id_wishlist=id_wishlist,
            name=name,
            url=url,
            price=price,
            description=description,
            state=state,
            id_user_who_offer=id_user_who_offer
        ).\
        where(GiftsTable.c.id == id)

    conn = engine.connect()
    conn.execute(update)
    conn.close()

def is_in_database(id):
    return bool(GiftsTable.query.filter_by(id=id).first())
