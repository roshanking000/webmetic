from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from bson.objectid import ObjectId
import random
import hashlib
import string
import random
from datetime import datetime
import secrets

from server.database import user_collection, check_login, check_user, add_user
from server.models.user import (
    ErrorResponseModel,
    ResponseModel,
    UserSignupSchema,
    UserLoginSchema,
)
from server.auth.auth_handler import signJWT, decodeJWT, create_access_token
from server.utils.utils import hash_password
from server.email import (
    send_verification_code_to_email,
    send_password_reset_code_to_email,
)

router = APIRouter()


@router.post("/signin", response_description="Signin")
async def user_login(user: UserLoginSchema = Body(...)):
    user = jsonable_encoder(user)
    user_data = await check_login(user)

    if user_data != None:
        if user_data["verified"] == True:
            # update user's last activity
            await user_collection.update_one({"_id": ObjectId(user_data["_id"])}, {"$set": {"last_activity": datetime.now()}})
            return ResponseModel(signJWT(user_data), "Signin successfully")
        else:
            return ErrorResponseModel(
                "An error occurred.", 401, "Please verify your email!"
            )
    return ErrorResponseModel("An error occurred.", 401, "Signin failed!")


@router.post("/signup", response_description="Signup")
async def add_user_data(user: UserSignupSchema = Body(...)):
    user = jsonable_encoder(user)
    user["password"] = hash_password(user["password"])
    check_result = await check_user(user)
    if check_result == False:
        new_user = await add_user(
            {
                "name": user["name"],
                "email": user["email"],
                "password": user["password"],
                "verification_code": "",
                "verified": False,
                "customer_id": "",
                "website": [],
                "added_by_user_info": [],
                "api_key": "",
                "last_activity": datetime.now()
            }
        )

        verification_code = generate_verification_code()

        await user_collection.find_one_and_update(
            {"_id": ObjectId(new_user["id"])},
            {"$set": {"verification_code": verification_code}},
        )

        url = f"https://webmetic.de/verifyemail?verifyCode={verification_code}"
        # url = f"http://localhost:7778/verifyemail?verifyCode={verification_code}"

        send_verification_code_to_email(user["email"], url)

        return {
            "status": "success",
            "message": "Verification token successfully sent to your email",
        }
    return {
        "status": "fail",
        "message": "Such a user exists!",
    }


@router.post("/signup/verifyemail/{token}", response_description="Verify email")
async def verify_me(token: str):
    result = await user_collection.find_one_and_update(
        {"verification_code": token},
        {"$set": {"verification_code": None, "verified": True}},
        new=True,
    )
    if not result:
        return {
            "status": "fail",
            "message": "Invalid verification code or account already verified",
        }

    customer_id = generate_random_ids_reduced_set()
    updated_user = await user_collection.update_one(
        {"_id": ObjectId(result["_id"])},
        {"$set": {"customer_id": customer_id[0]}},
    )
    if updated_user:
        return {"status": "success", "message": "Account verified successfully"}
    return {"status": "fail", "message": "An unexpected error occurred!"}


class ForgotPasswordItem(BaseModel):
    email_address: str


@router.post("/forgot_password", response_description="ForgotPassword")
async def forgot_password(item: ForgotPasswordItem):
    user = await user_collection.find_one({"email": item.email_address})
    if user:
        TEMP_TOKEN_EXPIRE_MINUTES = 10
        access_token = create_access_token(user["email"], TEMP_TOKEN_EXPIRE_MINUTES)

        url = f"https://webmetic.de/reset-password?access_token={access_token}"
        # url = f"http://localhost:7778/reset-password?access_token={access_token}"

        send_password_reset_code_to_email(item.email_address, url)
        return {
            "status": "success",
            "msg": "Your password reset token successfully sent to your email",
        }
    return {
        "status": "fail",
        "msg": "An unexpected error occurred!",
    }


class ResetPasswordItem(BaseModel):
    access_token: str
    password: str


@router.post("/reset_password", response_description="ResetPassword")
async def reset_password(item: ResetPasswordItem):
    try:
        payload = decodeJWT(item.access_token)
    except:
        payload = None

    if payload:
        result = await user_collection.find_one_and_update(
            {"email": payload["email"]},
            {"$set": {"password": hash_password(item.password)}},
            new=True,
        )
        if result:
            return {
                "status": "success",
                "msg": "Password updated successfully!",
            }
        return {
            "status": "fail",
            "msg": "An unexpected error occurred!",
        }

    return {
        "status": "fail",
        "msg": "Access token expired!",
    }


def generate_verification_code():
    # generate verification code
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    return ''.join(secrets.choice(alphabet) for _ in range(10))


def generate_random_ids_reduced_set(num_ids=1, length=6, excluded_chars="01lIoO2Z5S8B"):
    # Define the set of allowed characters (a-z, 0-9) minus the excluded characters
    allowed_characters = "".join(
        set(string.ascii_lowercase + string.digits) - set(excluded_chars)
    )

    # Generate random IDs using the allowed characters
    return [
        "".join(random.choices(allowed_characters, k=length)) for _ in range(num_ids)
    ]
