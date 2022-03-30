import hashlib
from flask import Flask
from flask_cors import CORS
from flask import redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func
from flask import request
import time

from models import User, Gift, Wishlist

app = Flask(__name__)

CORS(app)


@app.route('/')
def hello_world():
    return 'Hello World'


def initialisation():
    User.delete_user_table()
    Gift.delete_GiftsTable()
    Wishlist.delete_WishlistTable()

    User.create_user_table()
    Gift.create_GiftsTable()
    Wishlist.create_WishlistTable()


if __name__ == '__main__':
    initialisation()
    app.run(debug = True)
