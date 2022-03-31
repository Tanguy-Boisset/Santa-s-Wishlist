import hashlib
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func
from flask import Flask, request, redirect, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from config import DATABASE_CONFIG, JWT_SECRET_KEY


import time
from models import User, Gift, Wishlist
app = Flask(__name__)

#CORS(app)
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


# @app.route("/add_wishlist", methods=["POST"])
# @jwt_required()
# def add_wishlist():
#     id = get_jwt_identity()
#     name = request.json.get("name", None)
#     description = request.json.get("description", None)

#     Wishlist.add_Wishlist(id_creator = id, name=name, description=description)
#     return jsonify({"msg": "wishlist created"}), 200


@app.route("/get_wishlist", methods=["GET"])
@jwt_required()
def get_wishlist():
    id = get_jwt_identity()
    wishlist = Wishlist.get_wishlist(id)
    return jsonify({"msg": wishlist}), 200


@app.route("/getid", methods=["GET"])
@jwt_required()
def get_id():
    current_id = get_jwt_identity()
    return jsonify(logged_in_as=current_id), 200


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
