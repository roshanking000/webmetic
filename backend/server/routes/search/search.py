from fastapi import APIRouter, Depends, Request
import re

from server.auth.auth_bearer import JWTBearer
from server.database import database

router = APIRouter()


@router.get("/get_search_result", dependencies=[Depends(JWTBearer())])
async def get_search_result(weburl, search_key):
    array_weburl = weburl.split(",")
    company_profile_data = await get_company_profile(array_weburl, search_key)
    return {"data": company_profile_data, "status": "success"}


# Get lead profiles
async def get_company_profile(array_weburl: list, search_key: str):
    total_company_profiles = []

    regex_pattern = re.compile(f".*{re.escape(search_key)}.*", re.IGNORECASE)

    for item in array_weburl:
        data_collection = database.get_collection(
            item.split(".")[0].replace("https://", "") + "_" + item.split(".")[1]
        )

        pipeline = [
            {
                "$lookup": {
                    "from": "e_data",
                    "localField": "ip_address",
                    "foreignField": "ip",
                    "as": "company_data",
                }
            },
            {
                "$match": {
                    "company_data": {"$exists": "true", "$ne": []},
                    "company_data.whois_company": {"$exists": "true"},
                    "company_data.whois_company": {"$regex": regex_pattern}
                }
            },
            {"$unwind": {"path": "$company_data"}},
            {"$sort": {"total_visit_time": -1}},
            {
                "$project": {
                    "_id": 0,
                    "brand": {"$ifNull": ["$company_data.brand", None]},
                    "company": "$company_data.company_info_1.asname",
                    "city": "$company_data.company_info_1.city",
                    "pages": {"$size": "$user_data"},
                    "source": {"$first": "$user_data.referrer"},
                    "duration": "$total_visit_time",
                    "social": "$company_data.brand.links",
                    "website_url": "$company_data.bing_search.link",
                    "domain": "$company_data.company_url",
                    "logo": None,
                    "mail": "$company_data.whois_extract.emails",
                    "user_data": "$user_data",
                }
            },
        ]

        cursor = data_collection.aggregate(pipeline)
        company_profiles = await cursor.to_list(length=None)
        print(company_profiles)

        total_company_profiles.extend(company_profiles)

    for item in total_company_profiles:
        if item["brand"] != None:
            preferred_image = find_preferred_image(item["brand"])
            item["logo"] = preferred_image

    return {"status": "success", "data": total_company_profiles}


def find_preferred_image(brandfetch_response):
    # Extract the domain name and replace '.' with '_'
    domain_name = brandfetch_response["domain"].replace(".", "_")

    # Priority: SVG icon > PNG/JPEG icon > SVG logo > PNG/JPEG logo
    for logo_type in ["icon", "logo"]:
        svg_images = [
            (logo["theme"] if logo["theme"] else "no_theme", fmt["src"], fmt["format"])
            for logo in brandfetch_response["logos"]
            if logo["type"] == logo_type
            for fmt in logo["formats"]
            if fmt["format"] == "svg"
        ]
        if svg_images:
            theme, _, format = svg_images[
                0
            ]  # Extract theme and format of the first SVG found
            filename = f"{domain_name}_{theme}_{logo_type}.{format}"
            return domain_name + "/" + filename

        png_jpeg_images = [
            (logo["theme"] if logo["theme"] else "no_theme", fmt["src"], fmt["format"])
            for logo in brandfetch_response["logos"]
            if logo["type"] == logo_type
            for fmt in logo["formats"]
            if fmt["format"] in ["png", "jpeg"]
        ]
        if png_jpeg_images:
            theme, _, format = png_jpeg_images[
                0
            ]  # Extract theme and format of the first PNG/JPEG found
            filename = f"{domain_name}_{theme}_{logo_type}.{format}"
            return domain_name + "/" + filename

    return "No suitable image found"
