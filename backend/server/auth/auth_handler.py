import time
from typing import Dict

import jwt
from decouple import config
from datetime import datetime, timedelta


JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")


def signJWT(user_data):
    payload = {"_id": str(user_data["_id"]), "name": user_data["name"], "email": user_data["email"], "website": user_data["website"], "customer_id": user_data["customer_id"], "exp": time.time() + 6000}
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token_response(token)


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["exp"] >= time.time() else None
    except:
        return {}


def create_access_token(data: str, expire_minutes=10):
    expire = time.time() + 60*expire_minutes
    to_encode = {"email": data, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt


def token_response(token: str):
    return {"access_token": token}
