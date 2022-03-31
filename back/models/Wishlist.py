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

WishlistTable = Table('wishlist', Wishlist.metadata)

def create_WishlistTable():
    Wishlist.metadata.create_all(engine)

def delete_WishlistTable():
    Wishlist.metadata.drop_all(engine)

def add_Wishlist(id_creator, name, description):

    hashed_url = generate_password_hash(f"{id_creator}{name}{description}", method='sha256')

    insert_stmt = WishlistTable.insert().values(
        id_creator=id_creator,
        name=name,
        hashed_url=hashed_url,
        description=description,
    )
    conn = engine.connect()
    conn.execute(insert_stmt)
    conn.close()

def update_Wishlist(id, id_creator, name, description):

    hashed_url = generate_password_hash(f"{id_creator}{name}{description}", method='sha256')

    update = WishlistTable.update().\
        values(
            id_creator=id_creator,
            name=name,
            hashed_url=hashed_url,
            description=description,
        ).\
        where(WishlistTable.c.id == id)

    conn = engine.connect()
    conn.execute(update)
    conn.close()

def is_in_database(id):
    return bool(WishlistTable.query.filter_by(id=id).first())

def get_wishlist(id_creator):

    query = select([
        WishlistTable.c.id,
        WishlistTable.c.id_creator,
        WishlistTable.c.name,
        WishlistTable.c.hashed_url,
        WishlistTable.c.description,
        ]).where(WishlistTable.c.id_creator == id_creator).distinct()

    conn = engine.connect()
    results = conn.execute(query)

    whist_list_table = []

    for result in results:
        whist_list_table.append({
            "id":result[0],
            "id_creator": result[1],
            "name":result[2],
            "hashed_url":result[3],
            "description":result[4],
        })

    conn.close()
    return whist_list_table
