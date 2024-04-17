import motor.motor_asyncio
from bson.objectid import ObjectId
from server.utils.utils import verify_password
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_DETAILS = os.getenv("mongo_test")

print(MONGO_DETAILS)

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.wm

user_collection = database.get_collection("user")
data_collection = database.get_collection("test_data_2")
testdata_collection = database.get_collection("test_data")


# helpers


def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "website": user["website"],
    }


async def retrieve_users():
    users = []
    async for user in user_collection.find():
        users.append(user_helper(user))
    return users


# check if a user exists in database
async def check_user(user_data: dict) -> dict:
    async for user in user_collection.find():
        if user["email"] == user_data["email"]:
            return True
    return False


# Add a new user into to the database
async def add_user(user_data: dict) -> dict:
    user = await user_collection.insert_one(user_data)
    new_user = await user_collection.find_one({"_id": user.inserted_id})
    return user_helper(new_user)


# check login
async def check_login(user_data: dict) -> dict:
    async for user in user_collection.find():
        if (
            user["email"] == user_data["email"]
            and verify_password(user_data["password"], user["password"]) == True
        ):
            return user
    return None


# Retrieve a user data with a matching ID
async def get_user_data(id: str) -> dict:
    user = await user_collection.find_one({"_id": ObjectId(id)})
    if user:
        return user_helper(user)


# Update a website url
async def update_website(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    user = await user_collection.find_one({"_id": ObjectId(id)})
    if user:
        websites = user["website"]
        print(user["website"])
        websites.append(data["website"])
        print(websites)
        updated_user = await user_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": {"website": websites}}
        )
        if updated_user:
            return True
        return False
