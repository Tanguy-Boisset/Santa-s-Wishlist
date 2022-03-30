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

    else:
        id = User.get_id(pseudo)
        if not User.check_password(id, password):
            return jsonify({"msg": "Bad password"}), 401
        else:
            access_token = create_access_token(identity=id)
            return jsonify(access_token=access_token), 200

@app.route("/signup", methods=["POST"])
def signup():
    pseudo = request.json.get("pseudo", None)
    name = request.json.get("name", None)
    surname = request.json.get("surname", None)
    password = request.json.get("password", None)

    if User.get_id(pseudo) is not None:
        return jsonify({"msg": "Pseudo is already in Database"}), 401
    elif len(password) <= 5:
        return jsonify({"msg": "Password too short"}), 401
    else:
        User.add_user(pseudo=pseudo, name=name, surname=surname, plain_password=password)
        id = User.get_id(pseudo)

        access_token = create_access_token(identity=id)
        return jsonify(access_token=access_token), 200


@app.route("/wishlist", methods=["GET"])
@jwt_required()
def get_wishlist():
    current_id = get_jwt_identity()
    #print(current_id)

    return jsonify(logged_in_as=current_id), 200

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
    #initialisation()
    app.run(debug = True)
