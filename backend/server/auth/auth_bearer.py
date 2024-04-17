from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .auth_handler import decodeJWT
from server.database import user_collection


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(
            JWTBearer, self
        ).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme."
                )
            result = self.verify_jwt(credentials.credentials)
            if not result["status"]:
                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token."
                )
            request.state.payload = result["payload"]
            return result["payload"]
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False

        try:
            payload = decodeJWT(jwtoken)
        except:
            payload = None
        if payload:
            isTokenValid = True
        return {
            "status": isTokenValid,
            "payload": payload
        }


class APIKeyBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(APIKeyBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(
            APIKeyBearer, self
        ).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme."
                )
            if not await self.verify_apikey(credentials.credentials):
                raise HTTPException(
                    status_code=403, detail="Invalid api key."
                )
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    async def verify_apikey(self, apikey: str) -> bool:
        isApiKeyValid: bool = False

        try:
            payload = await user_collection.find_one({"api_key": apikey})
        except:
            payload = None
        if payload:
            isApiKeyValid = True
        return isApiKeyValid
