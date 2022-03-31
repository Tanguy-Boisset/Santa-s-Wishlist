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

def add_Gift(id_wishlist, name, url, price, description, state, id_user_who_offer=None):

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

def get_id_wishlist_from_id_gift(id_gift):
    query = select([
        GiftsTable.c.id,
        ]).where(GiftsTable.c.id == id_gift).distinct()
    conn = engine.connect()
    results = conn.execute(query)
    id_wishlist = None
    for result in results:
        id_wishlist = result[0]
    conn.close()
    return id_wishlist

def delete_gift(id_gift):
    delete_stmt = GiftsTable.delete().where(GiftsTable.c.id == id_gift)
    conn = engine.connect()
    results = conn.execute(delete_stmt)
    conn.close()

def get_gifts(id_wishlist, oneself=False):

    if oneself == True:
        query = select([
            GiftsTable.c.id,
            GiftsTable.c.id_wishlist,
            GiftsTable.c.name,
            GiftsTable.c.url,
            GiftsTable.c.price,
            GiftsTable.c.description,
            ]).where(GiftsTable.c.id_wishlist == id_wishlist).distinct()
    else:
        query = select([
            GiftsTable.c.id,
            GiftsTable.c.id_wishlist,
            GiftsTable.c.name,
            GiftsTable.c.url,
            GiftsTable.c.price,
            GiftsTable.c.description,
            GiftsTable.c.state,
            GiftsTable.c.id_user_who_offer,
            ]).where(GiftsTable.c.id_wishlist == id_wishlist).distinct()

    conn = engine.connect()
    results = conn.execute(query)

    list_gifts = []

    if oneself == True:
        for result in results:
            list_gifts.append(
                {
                    "id": result[0],
                    "id_wishlist": result[1],
                    "name": result[2],
                    "url": result[3],
                    "price": result[4],
                    "description": result[5],
                }
        )
    else:
        for result in results:
            list_gifts.append(
                {
                    "id": result[0],
                    "id_wishlist": result[1],
                    "name": result[2],
                    "url": result[3],
                    "price": result[4],
                    "description": result[5],
                    "state": result[6],
                    "id_user_who_offer": result[7]
                }
        )

    conn.close()
    return list_gifts



