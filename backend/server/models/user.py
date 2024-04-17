from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class UserSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    verification_code: str
    verified: bool
    customer_id: str
    website: list = []
    added_by_user_info: list = []
    api_key: str
    last_activity: datetime

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "jdoe@gmail.com",
                "password": "weakpassword",
            }
        }


class UserLoginSchema(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {"email": "jdoe@gmail.com", "password": "weakpassword"}
        }
        
        
class UserSignupSchema(BaseModel):
    name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {"name": "john doe", "email": "jdoe@gmail.com", "password": "weakpassword"}
        }


class UserSetWebsiteSchema(BaseModel):
    website: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {"website": "https://example.com"}
        }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}
