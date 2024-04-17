from fastapi import APIRouter, Depends, Query, HTTPException
from datetime import datetime, timedelta, time
from dateutil.parser import parse

from server.database import database
from server.auth.auth_bearer import APIKeyBearer

router = APIRouter()


@router.get(
    "/get_visitor_sessions",
    dependencies=[Depends(APIKeyBearer())],
    response_description="Get visitor sessions",
)
async def get_visitor_sessions(
    domain: str,
    from_date: str = Query("-30 days", description="Starting DateTime"),
    to_date: str = Query("now", description="Ending DateTime"),
    timezone: str = Query(
        "Europe/Berlin", description="Timezone of input and output DateTimes"
    ),
    locale: str = Query("de-DE", description="Locale"),
    page: int = Query(1, description="Selected result page"),
    pageSize: int = Query(100, description="Number of entries per page"),
    includeCompany: bool = Query(True, description="Include company-details"),
    includeCompanySector: bool = Query(
        True,
        description="Include company-sector (Note applies only if includeCompany parameter is true)",
    ),
    includeVisits: bool = Query(True, description="Include visits details"),
):
    print(
        domain,
        from_date,
        to_date,
        timezone,
        locale,
        page,
        pageSize,
        includeCompany,
        includeCompanySector,
        includeVisits,
    )

    parsed_from_date = parse_date(from_date)
    parsed_to_date = parse_date(to_date)

    data_collection = database.get_collection(
        domain.split(".")[0].replace("https://", "") + "_" + domain.split(".")[1]
    )

    pipeline = [
        {
            "$match": {
                "timestamp": {
                    "$gte": parsed_from_date,
                    "$lt": parsed_to_date,
                },
            }
        },
        {
            "$lookup": {
                "from": "e_data",
                "localField": "ip_address",
                "foreignField": "ip",
                "as": "company_data",
            }
        },
        {"$match": {"company_data": {"$exists": "true", "$ne": []}}},
        {"$unwind": {"path": "$user_data"}},
        {"$unwind": {"path": "$company_data"}},
        {
            "$group": {
                "_id": {
                    "_id": {"$toString": "$_id"},
                    "language": "$user_language",
                    "company_data": "$company_data",
                },
                "startedAt": {"$first": "$user_data.timestamp"},
                "lastActivityAt": {"$last": "$user_data.timestamp"},
            }
        },
        {"$match": {"_id.company_data.company_info_1.timezone": timezone}},
        {"$sort": {"startedAt": 1}},
        {"$limit": pageSize},
        {"$skip": page - 1},
        {
            "$project": {
                "_id": 0,
                "guid": "$_id._id",
                "startedAt": "$startedAt",
                "lastActivityAt": "$lastActivityAt",
                "duration": {"$subtract": ["$lastActivityAt", "$startedAt"]},
                "language": "$_id.language",
                "company": {
                    "id": {"$toString": "$_id.company_data._id"},
                    "street": "$_id.company_data.gpt_imprint.Adresse",
                    "zip": "$_id.company_data.company_info_1.zip",
                    "name": "$_id.company_data.company_info_1.asname",
                    "phone": "$_id.company_data.gpt_imprint.Rufnummer",
                    "email": "$_id.company_data.gpt_imprint.Mail",
                    "city": "$_id.company_data.company_info_1.city",
                    "url": "$_id.company_data.website_crawler.url",
                    "countryCode": "No country code",
                    "countryCode3": "No country code3",
                },
            }
        },
    ]

    cursor = data_collection.aggregate(pipeline)
    result = await cursor.to_list(length=None)

    print(result)

    return {
        "pagination": {
            "total": 0,
            "isFirst": True,
            "current": 0,
            "isLast": False,
            "pageSize": 0,
        },
        "totals": {
            "sessions": 0,
            "companies": 0,
            "visits": 0,
            "interest_visits": 0,
            "interests": 0,
        },
        "result": result,
    }


def parse_date(from_date: str) -> datetime:
    try:
        # Attempt to parse the input string as an ISO 8601 format
        return parse(from_date)
    except ValueError:
        pass  # If parsing as ISO 8601 fails, continue to other formats

    # Attempt to parse relative dates like "now"
    if from_date == "now":
        return datetime.now()

    # Attempt to parse relative dates like "-1 year" or "-30 days"
    if from_date.startswith("-"):
        try:
            amount, unit = from_date.split()
            amount = int(amount)
            if unit == "year":
                return datetime.now() + timedelta(days=365 * amount)
            elif unit == "days":
                return datetime.now() + timedelta(days=amount)
            else:
                raise ValueError("Unsupported relative date unit")
        except ValueError as e:
            result = {"error": True, "errorDescription": str(e)}
            raise HTTPException(status_code=400, detail=result)

    # If none of the above conditions match, attempt to parse as a datetime string
    try:
        return datetime.fromisoformat(from_date)
    except ValueError as e:
        result = {"error": True, "errorDescription": str(e)}
        raise HTTPException(status_code=400, detail=result)
