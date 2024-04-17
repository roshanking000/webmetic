from fastapi import APIRouter, Depends
from bson.objectid import ObjectId
from pydantic import BaseModel

from server.database import database, user_collection, get_user_data
from server.auth.auth_bearer import JWTBearer
from server.models.user import (
    ErrorResponseModel,
    ResponseModel,
)

router = APIRouter()


@router.get("/get_website/{id}", dependencies=[Depends(JWTBearer())])
async def get_website(id):
    user = await get_user_data(id)
    if user:
        return ResponseModel(user, "User data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "User doesn't exist.")


@router.get("/get_connected_websites/{id}", dependencies=[Depends(JWTBearer())])
async def get_connected_websites(id):
    user = await user_collection.find_one({"_id": ObjectId(id)})
    if user:
        for item in user["added_by_user_info"]:
            admin_user = await user_collection.find_one({"email": item["email"]})
            user["website"].extend(admin_user["website"])

        return {
            "status": "success",
            "connected_websites": user["website"],
            "customer_id": user["customer_id"],
        }

    return {"status": "fail", "msg": "User doesn't exist."}


class AddWebsiteItem(BaseModel):
    email_address: str
    website: str


@router.post("/add_website", response_description="Add Website")
async def add_website(item: AddWebsiteItem):
    # check if domain exists
    domain_exists = await user_collection.count_documents({"website": item.website})
    if domain_exists > 0:
        return {
            "status": "fail",
            "msg": "Domain already exists!",
        }

    user = await user_collection.find_one_and_update(
        {"email": item.email_address}, {"$push": {"website": item.website}}
    )
    if user:
        # check collection exists in db
        collection_name = database.get_collection(
            item.website.split(".")[0].replace("https://", "") + "_" + item.website.split(".")[1]
        )
        collections = await database.list_collection_names()
        if collection_name in collections:
            return {
                "status": "success",
                "msg": "Website successfully added!",
            }
        else:
            return {
                "status": "warning",
                "msg": "No data yet, please integrate snippet!",
            }

    return {
        "status": "fail",
        "msg": "An unexpected error occurred!",
    }
