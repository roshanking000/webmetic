from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware

app = FastAPI()

# Enable GZip compression middleware
app.add_middleware(GZipMiddleware)

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


from server.routes.auth.auth import router as AuthRouter
from server.routes.account.account import router as AccountRouter
from server.routes.dashboard.dashboard import router as DashboardRouter
from server.routes.analytics.analytics import router as AnatlyticsRouter
from server.routes.setting.setting import router as SettingRouter
from server.routes.company_profile.company_profile import router as CompanyProfileRouter
from server.routes.search.search import router as SearchRouter

from server.routes.webmetic_api.api import router as APIRouter


app.include_router(AuthRouter, tags=["Auth"], prefix="/api/auth")
app.include_router(AccountRouter, tags=["Account"], prefix="/api/account")
app.include_router(DashboardRouter, tags=["Dashboard Data"], prefix="/api/dashboard")
app.include_router(AnatlyticsRouter, tags=["Analytics Data"], prefix="/api/analytics")
app.include_router(SettingRouter, tags=["Setting"], prefix="/api/setting")
app.include_router(CompanyProfileRouter, tags=["Company Profile"], prefix="/api/company_profile")
app.include_router(SearchRouter, tags=["Search"], prefix="/api/search")

app.include_router(APIRouter, tags=["API"], prefix="/api")


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}
