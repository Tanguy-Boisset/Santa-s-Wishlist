import hashlib
import json
import redis
import time

from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func
from flask import Flask, request, redirect, jsonify, make_response
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt
from config import DATABASE_CONFIG, JWT_SECRET_KEY
from datetime import timedelta

from models import User, Gift, Wishlist
app = Flask(__name__)

# ACCESS_EXPIRES = timedelta(minutes=15)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_CONFIG
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES

jwt = JWTManager(app)
db = SQLAlchemy(app)


# # Setup our redis connection for storing the blocklisted tokens. You will probably
# # want your redis instance configured to persist data to disk, so that a restart
# # does not cause your application to forget that a JWT was revoked.
# jwt_redis_blocklist = redis.StrictRedis(
#     host="localhost", port=6379, db=0, decode_responses=True
# )

# # Callback function to check if a JWT exists in the redis blocklist
# @jwt.token_in_blocklist_loader
# def check_if_token_is_revoked(jwt_header, jwt_payload):
#     jti = jwt_payload["jti"]
#     token_in_redis = jwt_redis_blocklist.get(jti)
#     return token_in_redis is not None


# # Endpoint for revoking the current users access token. Save the JWTs unique
# # identifier (jti) in redis. Also set a Time to Live (TTL)  when storing the JWT
# # so that it will automatically be cleared out of redis after the token expires.
# @app.route("/logout", methods=["GET"])
# @jwt_required()
# def logout():
#     jti = get_jwt()["jti"]
#     print(jti)
#     jwt_redis_blocklist.set(jti, "", ex=ACCESS_EXPIRES)

#     resp = make_response(jsonify("Access token revoked"))
#     resp.headers['Access-Control-Allow-Origin'] = '*'
#     resp.headers['Access-Control-Allow-Credentials'] = 'true'

#     return resp, 200



@app.route('/')
def hello_world():
    return 'Hello World'

@app.route("/login", methods=["POST"])
def login():

    dataStr = request.data.decode('utf-8')
    data = json.loads(dataStr)

    pseudo = data["pseudo"]
    password = data["password"]

    if User.get_id(pseudo) is None:
        # print(User.get_id(pseudo))
        resp = jsonify({"msg": "Pseudo is not in database"})
        status_code = 401
        return resp,status_code

    id = User.get_id(pseudo)
    if not User.check_password(id, password):
        resp = jsonify({"msg": "Bad password"})
        status_code = 401
    else:
        access_token = create_access_token(identity=id)
        print(access_token)
        print(JWT_SECRET_KEY.decode('ISO-8859-1'))
        resp = jsonify(access_token=access_token)
        status_code = 200
    return resp, status_code

@app.route("/signup", methods=["POST"])
def signup():

    dataStr = request.data.decode('utf-8')
    data = json.loads(dataStr)

    name = data["name"]
    pseudo = data["pseudo"]
    surname = data["surname"]
    password = data["password"]

    if User.get_id(pseudo) is not None:
        resp = make_response(jsonify({"msg": "Pseudo is already in Database"}))
        status_code = 401
    elif len(password) <= 5:
        resp = make_response(jsonify({"msg": "Password too short"}))
        status_code = 401
    else:
        User.add_user(pseudo=pseudo, name=name, surname=surname, plain_password=password)
        id = User.get_id(pseudo)


        Wishlist.add_Wishlist(id_creator = id, name=f"Wishlist of {pseudo}", description="Here is my wishlist !")

        access_token = create_access_token(identity=id)

        resp = make_response(jsonify(access_token=access_token))
        status_code = 200

    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    resp.headers['Access-Control-Allow-Headers'] = '*'


    # print(resp.headers)

    return resp, status_code


@app.route("/add_gift", methods=["POST"])
@cross_origin()
#@jwt_required()
def add_gift():
    #id_user = get_jwt_identity()
    name = request.json.get("name", None)
    url = request.json.get("url", None)
    price = request.json.get("price", None)
    description = request.json.get("description", None)
    hashed_url = request.json.get("hashed_url", None)
    state = "not-attribute"

    wishlist = Wishlist.get_wishlist(hashed_url)
    Gift.add_Gift(wishlist['id'], name=name, url=url, price=price, description=description, state=state)

    resp = make_response(jsonify({"msg": "gift added to the wishlist ! "}))
    #resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Credentials'] = 'true'

    return resp, 200

@app.route("/delete_gift", methods=["POST"])
@cross_origin()
#@jwt_required()
def delete_gift():
    #id_user = get_jwt_identity()
    id_gift = request.json.get("id_gift_delete", None)

    id_wishlist = Gift.get_id_wishlist_from_id_gift(id_gift)

    #if id_wishlist != Wishlist.get_id_wishlist_from_id_user(id_user):
    #    return jsonify({"msg": "you don't have the right to delete this gift, it does not belong to you"}), 401

    Gift.delete_gift(id_gift=id_gift)

    resp = make_response(jsonify({"msg": "gift deteted ! "}))
    #resp.headers['Access-Control-Allow-Origin'] = '*'
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
    oneself = False

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
    hashed_url = request.json.get("hashed_url", None)
    wishlist = Wishlist.get_wishlist(hashed_url)
    resp = make_response(jsonify(wishlist))
    #resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    return resp, 200

@app.route("/get_my_wishlist", methods=["GET"])
@cross_origin()
@jwt_required()
def get_my_wishlist():
    id_user = get_jwt_identity()
    wishlist = Wishlist.get_my_wishlist(id_user)
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

@app.route("/getname", methods=["POST"])
@cross_origin()
#@jwt_required()
def get_name():
    #current_id = get_jwt_identity()
    id = request.json.get("id", None)
    user = User.get_name(id)
    resp = make_response(jsonify(user))
    #resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    return resp, 200

@app.route("/getmyname", methods=["GET"])
@cross_origin()
@jwt_required()
def get_my_name():
    current_id = get_jwt_identity()
    user = User.get_name(current_id)
    resp = make_response(jsonify(user))
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    return resp, 200

@app.route("/attribute_gift", methods=["POST"])
@cross_origin()
#@jwt_required()
def attribute_gift():
    #id_user = get_jwt_identity()
    id_gift = request.json.get("id_gift", None)

    id_wishlist = Gift.get_id_wishlist_from_id_gift(id_gift)

    if id_wishlist is None:

        resp = make_response(jsonify({"msg": "This gift does not exists"}))
        #resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Credentials'] = 'true'

        return resp, 401

    #elif id_wishlist == Wishlist.get_id_wishlist_from_id_user(id_user):

        resp = make_response(jsonify({"msg": "You don't have the right to attribute your own gifts"}))
        #resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Credentials'] = 'true'


        return resp, 401
    else:
        id_user = 1 # à changer
        Gift.attribute_gift(id_gift, id_user)

        resp = make_response(jsonify({"msg": "Gift Attributed"}))
        #resp.headers['Access-Control-Allow-Origin'] = '*'
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
    # initialisation()
    app.run(debug = True)
