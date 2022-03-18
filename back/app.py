import hashlib
from flask import Flask
from flask_cors import CORS
from flask import redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func
from flask import request
import time

app = Flask(__name__)

CORS(app)

@app.route('/')
def hello_world():
    return 'Hello World'










if __name__ == '__main__':
    #db.drop_all()
    #db.create_all()

    app.run(debug = True)
