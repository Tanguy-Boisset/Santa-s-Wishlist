import hashlib
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func
from flask import Flask, request, redirect, jsonify, make_response
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from config import DATABASE_CONFIG, JWT_SECRET_KEY


import time
from models import User, Gift, Wishlist
app = Flask(__name__)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_CONFIG

jwt = JWTManager(app)
db = SQLAlchemy(app)

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route("/login", methods=["POST"])
def login():
    pseudo = request.json.get("pseudo", None)
    password = request.json.get("password", None)

    if User.get_id(pseudo) is None:
        return jsonify({"msg": "Pseudo is not in database"}), 401


    id = User.get_id(pseudo)
    if not User.check_password(id, password):
        return jsonify({"msg": "Bad password"}), 401
    else:
        access_token = create_access_token(identity=id)
        return jsonify(access_token=access_token), 200

@app.route("/signup", methods=["POST"])
def signup():

    name = request.json.get("name", None)
    pseudo = request.json.get("pseudo", None)
    surname = request.json.get("surname", None)
    password = request.json.get("password", None)

    if User.get_id(pseudo) is not None:
        return jsonify({"msg": "Pseudo is already in Database"}), 401
    elif len(password) <= 5:
        return jsonify({"msg": "Password too short"}), 401

    User.add_user(pseudo=pseudo, name=name, surname=surname, plain_password=password)
    id = User.get_id(pseudo)

    Wishlist.add_Wishlist(id_creator = id, name=f"Wishlist of {pseudo}", description="Here is my wishlist !")

    access_token = create_access_token(identity=id)
    return jsonify(access_token=access_token), 200


@app.route("/add_gift", methods=["POST"])
@jwt_required()
def add_gift():
    id_user = get_jwt_identity()
    name = request.json.get("name", None)
    url = request.json.get("url", None)
    price = request.json.get("price", None)
    description = request.json.get("name", None)
    state = "not-attribute"

    id_wishlist = Wishlist.get_id_wishlist_from_id_user(id_user)
    Gift.add_Gift(id_wishlist = id_wishlist, name=name, url=url, price=price, description=description, state=state)

    resp = make_response(jsonify({"msg": "gift added to the wishlist ! "}))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Credentials'] = 'true'

    return resp, 200

@app.route("/delete_gift", methods=["POST"])
@jwt_required()
def delete_gift():
    id_user = get_jwt_identity()
    id_gift = request.json.get("id_gift_delete", None)

    id_wishlist = Gift.get_id_wishlist_from_id_gift(id_gift)

    if id_wishlist != Wishlist.get_id_wishlist_from_id_user(id_user):
        return jsonify({"msg": "you don't have the right to delete this gift, it does not belong to you"}), 401

    Gift.delete_gift(id_gift=id_gift)

    resp = make_response(jsonify({"msg": "gift deteted ! "}))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Credentials'] = 'true'

    return resp, 200


@app.route("/get_gift_from_wishlist", methods=["POST"])
#@jwt_required()
def get_gift_from_wishlist():
    #id_user = get_jwt_identity()
    id_wishlist = request.json.get("id_wishlist", None)

    #if id_wishlist == Wishlist.get_id_wishlist_from_id_user(id_user):
    #    oneself = True
    #else:
    #    oneself = False
    oneself = True

    list_gifts = Gift.get_gifts(id_wishlist, oneself)
    resp = make_response(jsonify(list_gifts))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Credentials'] = 'true'

    return resp, 200


@app.route("/get_wishlist", methods=["POST"])
@cross_origin()
#@jwt_required()
def get_wishlist():
    #id_user = get_jwt_identity()
    id_wishlist = request.json.get("id_wishlist", None)
    wishlist = Wishlist.get_wishlist(id_wishlist)
    resp = make_response(jsonify(wishlist))
    #resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    return resp, 200


@app.route("/get_all_wishlists", methods=["GET"])
#@jwt_required()
def get_all_wishlists():
    wishlist = Wishlist.get_all_wishlists()
    resp = make_response(jsonify(wishlist))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    return resp, 200


@app.route("/getid", methods=["GET"])
@jwt_required()
def get_id():
    current_id = get_jwt_identity()
    resp = make_response(jsonify(current_id))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    return resp, 200


def initialisation():
    User.delete_user_table()
    Gift.delete_GiftsTable()
    Wishlist.delete_WishlistTable()

    User.create_user_table()
    Gift.create_GiftsTable()
    Wishlist.create_WishlistTable()


if __name__ == '__main__':
    #initialisation()
    app.run(debug = True)
