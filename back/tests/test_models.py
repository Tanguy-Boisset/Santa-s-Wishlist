
import os
import sys
topdir = os.path.join(os.path.dirname(__file__), "..")
sys.path.append(topdir)

import pytest
from app import app

def test_hello():

    #app = test

    response = app.test_client().get('/')

    assert response.status_code == 200
    assert response.data == b'Hello World'