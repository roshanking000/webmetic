from fastapi import APIRouter, Depends
from pydantic import BaseModel
from uuid import uuid4

from server.database import user_collection
from server.auth.auth_bearer import JWTBearer

router = APIRouter()


@router.get(
    "/get_user_list",
    dependencies=[Depends(JWTBearer())],
    response_description="Get user list",
)
async def get_user_list(email):
    user_list = await user_collection.find(
        {"added_by_user_info": {"$elemMatch": {"email": email}}},
        {
            "_id": 0,
            "name": 1,
            "email": 1,
            "added_by_user_info.name": 1,
            "last_activity": 1,
        },
    ).to_list(length=None)

    print(user_list)
    return {"status": "success", "data": user_list}


class AddNewUserItem(BaseModel):
    email_address: str
    user_name: str
    user_email: str

@router.post(
    "/add_new_user",
    dependencies=[Depends(JWTBearer())],
    response_description="Add New User",
)
async def add_new_user(item: AddNewUserItem):
    # check admin
    admin_user = await user_collection.find_one({"email": item.email_address})
    if admin_user is None:
        return {
            "status": "fail",
            "msg": "An unexpected error occurred!",
        }

    # check user
    if item.email_address == item.user_email:
        return {
            "status": "fail",
            "msg": "You can't add yourself!",
        }

    user = await user_collection.find_one(
        {"name": item.user_name, "email": item.user_email}
    )
    if user:
        # check if user already existed
        manage_user = await user_collection.find_one(
            {
                "name": item.user_name,
                "email": item.user_email,
                "added_by_user_info": {"$elemMatch": {"email": admin_user["email"]}},
            }
        )
        if manage_user:
            return {
                "status": "fail",
                "msg": "This user has already been added!",
            }

        # add user
        user_result = await user_collection.find_one_and_update(
            {
                "name": item.user_name,
                "email": item.user_email,
            },
            {
                "$push": {
                    "added_by_user_info": {
                        "name": admin_user["name"],
                        "email": admin_user["email"],
                    }
                }
            },
        )

        if user_result:
            # add admin
            admin_result = await user_collection.find_one_and_update(
                {
                    "name": admin_user["name"],
                    "email": admin_user["email"],
                },
                {
                    "$push": {
                        "added_by_user_info": {
                            "name": item.user_name,
                            "email": item.user_email,
                        }
                    }
                },
            )

            if admin_result:
                return {
                    "status": "success",
                    "msg": "User successfully added!",
                }

        return {
            "status": "fail",
            "msg": "An unexpected error occurred!",
        }

    return {
        "status": "fail",
        "msg": "No such a user!",
    }


class EditUserParameter(BaseModel):
    admin_email: str
    old_user_name: str
    old_user_email: str
    user_name: str
    user_email: str

@router.post(
    "/edit_user",
    dependencies=[Depends(JWTBearer())],
    response_description="Edit User",
)
async def edit_user(item: EditUserParameter):
    # check admin
    admin_user = await user_collection.find_one(
        {"email": item.admin_email}
    )
    if admin_user is None:
        return {
            "status": "fail",
            "msg": "An unexpected error occurred!",
        }

    # check user
    if item.admin_email == item.user_email:
        return {
            "status": "fail",
            "msg": "You can't add yourself!",
        }

    user = await user_collection.find_one(
        {"name": item.user_name, "email": item.user_email}
    )
    if user:
        # check if user already existed
        manage_user = await user_collection.find_one(
            {
                "name": item.user_name,
                "email": item.user_email,
                "added_by_user_info": {"$elemMatch": {"email": admin_user["email"]}},
            }
        )
        if manage_user:
            return {
                "status": "fail",
                "msg": "This user has already been added!",
            }

        result = await delete_user(item.old_user_email, item.admin_email)
        if result["status"] == "success":
            result = await user_collection.find_one_and_update(
                {
                    "name": item.user_name,
                    "email": item.user_email,
                },
                {
                    "$push": {
                        "added_by_user_info": {
                            "name": admin_user["name"],
                            "email": admin_user["email"],
                        }
                    }
                },
            )
            return {
                "status": "success",
                "msg": "User successfully added!",
            }
        return {
            "status": "fail",
            "msg": "An unexpected error occurred!",
        }
    return {
        "status": "fail",
        "msg": "No such a user!",
    }


class RemoveUserParameter(BaseModel):
    user_email: str
    admin_email: str

@router.post(
    "/remove_user",
    dependencies=[Depends(JWTBearer())],
    response_description="Remove User",
)
async def remove_user(item: RemoveUserParameter):
    result = await delete_user(item.user_email, item.admin_email)
    return result


async def delete_user(user_email, admin_email):
    admin_user = await user_collection.find_one({"email": admin_email})

    user = await user_collection.find_one_and_update(
        {"email": user_email},
        {
            "$pull": {
                "added_by_user_info": {
                    "name": admin_user["name"],
                    "email": admin_user["email"],
                }
            }
        },
    )

    if user:
        return {
            "status": "success",
            "msg": "User successfully removed!",
        }
    return {
        "status": "fail",
        "msg": "An unexpected error occurred!",
    }


@router.get(
    "/get_api_key",
    dependencies=[Depends(JWTBearer())],
    response_description="Get API Key",
)
async def get_api_key(email):
    user = await user_collection.find_one({"email": email})

    if user:
        return {"status": "success", "data": user["api_key"]}
    return {
        "status": "fail",
        "msg": "An unexpected error occurred!",
    }


class GenerateAPIKeyParameter(BaseModel):
    user_email: str

@router.post(
    "/generate_api_key",
    dependencies=[Depends(JWTBearer())],
    response_description="Generate API Key",
)
async def generate_api_key(item: GenerateAPIKeyParameter):
    user = await user_collection.find_one({"email": item.user_email})

    if user:
        api_key = str(uuid4())

        result = await user_collection.find_one_and_update(
            {"email": item.user_email},
            {"$set": {"api_key": api_key}},
        )
        if result:
            return {"status": "success", "data": api_key}
    return {
        "status": "fail",
        "msg": "An unexpected error occurred!",
    }
