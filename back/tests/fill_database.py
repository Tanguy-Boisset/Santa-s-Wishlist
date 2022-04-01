import requests
import json
import random

url = "http://127.0.0.1:5000"

data = {
    "pseudo":"pseudo_"+str(random.randint(0,10**6)),
    "name": "name",
    "surname": "surname",
    "password": "password"
}

request1 = requests.post(url+"/signup", json = data)
print(request1.text)
#print(request1.status_code)

jwt = json.loads(request1.text)["access_token"]

header = {"Authorization":f"Bearer {jwt}"}

print("jwt : ",jwt)

data2 = {
    "name": "name",
    "description": "description",
}

request2 = requests.get(url+"/getid", headers=header)
print(request2.text)

request4 = requests.get(url+"/get_all_wishlists", headers=header)
print(request4.text)

data3 = {
    "name": "nom cadeau",
    "url": "amazon.fr",
    "price": 3,
    "description": "description",
}

request5 = requests.post(url+"/add_gift", headers=header, json=data3)
print(request5.text)

data4 = {
    "id_wishlist" : 3
}


request6 = requests.post(url+"/get_gift_from_wishlist", headers=header, json=data4)
print(request6.status_code)
print(request6.text)


# data5 = {
#     "id_gift_delete" : 7
# }

# request7 = requests.post(url+"/delete_gift", headers=header, json=data5)
# print(request7.text)