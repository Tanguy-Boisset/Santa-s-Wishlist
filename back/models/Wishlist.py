from sqlalchemy import Table
from sqlalchemy.sql import select
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from config import engine

db = SQLAlchemy()


class Wishlist(db.Model):
    id = db.Column(db.Integer, autoincrement = True, primary_key=True)
    id_creator = db.Column(db.Integer)
    name = db.Column(db.String)
    hashed_url = db.Column(db.String)
    description = db.Column(db.String)
    date = db.Column(db.Date)

WishlistTable = Table('wishlist', Wishlist.metadata)

def create_WishlistTable():
    Wishlist.metadata.create_all(engine)

def delete_WishlistTable():
    Wishlist.metadata.drop_all(engine)

def add_Wishlist(id_creator, name, description, date):

    hashed_url = generate_password_hash(id_creator+name+description+date, method='sha256')

    insert_stmt = WishlistTable.insert().values(
        id_creator=id_creator,
        name=name,
        hashed_url=hashed_url,
        description=description,
        date=date
    )
    conn = engine.connect()
    conn.execute(insert_stmt)
    conn.close()

def update_Wishlist(id, id_creator, name, description, date):

    hashed_url = generate_password_hash(id_creator+name+description+date, method='sha256')

    update = WishlistTable.update().\
        values(
            id_creator=id_creator,
            name=name,
            hashed_url=hashed_url,
            description=description,
            date=date
        ).\
        where(WishlistTable.c.id == id)

    conn = engine.connect()
    conn.execute(update)
    conn.close()

def is_in_database(id):
    return bool(WishlistTable.query.filter_by(id=id).first())