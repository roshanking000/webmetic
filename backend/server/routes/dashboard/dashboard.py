from fastapi import APIRouter, Depends, Request
from datetime import datetime, timedelta
import math

from server.auth.auth_bearer import JWTBearer
from server.database import database

router = APIRouter()


@router.get("/get_dashboard_data", dependencies=[Depends(JWTBearer())])
async def get_dashboard_data(request: Request, weburl, period):
    array_weburl = weburl.split(",")
    visitor_data = await get_visitors(
        request.state.payload["customer_id"], array_weburl, period
    )
    visited_page_data = await get_most_visited_pages(
        request.state.payload["customer_id"], array_weburl, period
    )
    session_duration_data = await get_session_duration(
        request.state.payload["customer_id"], array_weburl, period
    )
    bounce_rate_data = await get_bounce_rate(
        request.state.payload["customer_id"], array_weburl, period
    )

    return {
        "data": {
            "visitor_data": visitor_data,
            "visited_page_data": visited_page_data,
            "session_duration_data": session_duration_data,
            "bounce_rate_data": bounce_rate_data,
        },
        "status": "success",
    }


@router.get("/get_visitors_location_data", dependencies=[Depends(JWTBearer())])
async def get_visitors_location_data(weburl, period):
    array_weburl = weburl.split(",")
    visitors_location_data = await get_visitors_location(array_weburl, period)
    return {"data": visitors_location_data, "status": "success"}


@router.get("/get_visited_pages_data", dependencies=[Depends(JWTBearer())])
async def get_visited_pages_data(weburl, period):
    array_weburl = weburl.split(",")
    visited_pages_data = await get_visited_pages_info(array_weburl, period)
    return {"data": visited_pages_data, "status": "success"}


@router.get("/get_lead_profiles_data", dependencies=[Depends(JWTBearer())])
async def get_lead_profiles_data(weburl, period, page_num, page_count):
    array_weburl = weburl.split(",")
    lead_profiles_data = await get_lead_profiles(
        array_weburl, period, int(page_num), int(page_count)
    )
    return {"data": lead_profiles_data, "status": "success"}


@router.get("/get_visitor_source_data", dependencies=[Depends(JWTBearer())])
async def get_visitor_source_data(weburl, period):
    array_weburl = weburl.split(",")
    lead_profiles_data = await get_visitor_source(array_weburl, period)
    return {"data": lead_profiles_data, "status": "success"}


# Get visitors count
async def get_visitors(customer_id: str, array_weburl: list, period: str):
    total_last_visitor_count = 0
    total_current_visitor_count = 0

    for item in array_weburl:
        data_collection = database.get_collection(
            item.split(".")[0].replace("https://", "") + "_" + item.split(".")[1]
        )

        if period != "All Time":
            if period == "Last 7 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=6)

                # last data
                lastdata_end_date = end_date - timedelta(days=7)
                lastdata_start_date = end_date - timedelta(days=6)

            elif period == "Last 15 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=14)

                # last data
                lastdata_end_date = end_date - timedelta(days=15)
                lastdata_start_date = end_date - timedelta(days=14)

            elif period == "Last month":
                current_date = datetime.now()
                start_date = (
                    datetime(current_date.year, current_date.month - 1, 1)
                    if current_date.month > 1
                    else datetime(current_date.year - 1, 12, 1)
                )
                end_date = datetime(current_date.year, current_date.month, 1)

                # last data
                lastdata_start_date = (
                    datetime(current_date.year, current_date.month - 2, 1)
                    if current_date.month > 2
                    else datetime(current_date.year - 1, 12 + current_date.month - 2, 1)
                )
                lastdata_end_date = (
                    datetime(current_date.year, current_date.month - 1, 1)
                    if current_date.month > 1
                    else datetime(current_date.year - 1, 12, 1)
                )

            elif period == "Last year":
                current_date = datetime.now()
                start_date = datetime(current_date.year - 1, 1, 1)
                end_date = datetime(current_date.year, 1, 1)

                # last data
                lastdata_start_date = datetime(current_date.year - 2, 1, 1)
                lastdata_end_date = datetime(current_date.year - 1, 1, 1)

            # get last visitor count
            last_visitor_count = await data_collection.count_documents(
                {
                    "timestamp": {
                        "$gte": lastdata_start_date,
                        "$lt": lastdata_end_date,
                    },
                    "aid": customer_id,
                }
            )

            # get current visitor count
            current_visitor_count = await data_collection.count_documents(
                {
                    "timestamp": {"$gte": start_date, "$lt": end_date},
                    "aid": customer_id,
                }
            )

            total_last_visitor_count += last_visitor_count
            total_current_visitor_count += current_visitor_count

        else:
            # get current visitor count
            current_visitor_count = await data_collection.count_documents(
                {
                    "aid": customer_id,
                }
            )

            total_last_visitor_count += current_visitor_count
            total_current_visitor_count += current_visitor_count

    return {
        "last_visitor_count": total_last_visitor_count,
        "current_visitor_count": total_current_visitor_count,
    }


# Get Most Visited Pages count
async def get_most_visited_pages(customer_id: str, array_weburl: list, period: str):
    total_current_count = 0
    total_last_count = 0

    for item in array_weburl:
        data_collection = database.get_collection(
            item.split(".")[0].replace("https://", "") + "_" + item.split(".")[1]
        )

        current_count = 0
        last_count = 0
        pipeline = []
        lastdata_pipeline = []

        if period != "All Time":
            if period == "Last 7 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=6)

                # last data
                lastdata_end_date = end_date - timedelta(days=7)
                lastdata_start_date = end_date - timedelta(days=6)

            elif period == "Last 15 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=14)

                # last data
                lastdata_end_date = end_date - timedelta(days=15)
                lastdata_start_date = end_date - timedelta(days=14)

            elif period == "Last month":
                current_date = datetime.now()
                start_date = (
                    datetime(current_date.year, current_date.month - 1, 1)
                    if current_date.month > 1
                    else datetime(current_date.year - 1, 12, 1)
                )
                end_date = datetime(current_date.year, current_date.month, 1)

                # last data
                lastdata_start_date = (
                    datetime(current_date.year, current_date.month - 2, 1)
                    if current_date.month > 2
                    else datetime(current_date.year - 1, 12 + current_date.month - 2, 1)
                )
                lastdata_end_date = (
                    datetime(current_date.year, current_date.month - 1, 1)
                    if current_date.month > 1
                    else datetime(current_date.year - 1, 12, 1)
                )

            elif period == "Last year":
                current_date = datetime.now()
                start_date = datetime(current_date.year - 1, 1, 1)
                end_date = datetime(current_date.year, 1, 1)

                # last data
                lastdata_start_date = datetime(current_date.year - 2, 1, 1)
                lastdata_end_date = datetime(current_date.year - 1, 1, 1)

            pipeline.append(
                {
                    "$match": {
                        "timestamp": {
                            "$gte": start_date,
                            "$lt": end_date,
                        },
                        "aid": customer_id,
                    }
                }
            )
            lastdata_pipeline.append(
                {
                    "$match": {
                        "timestamp": {
                            "$gte": lastdata_start_date,
                            "$lt": lastdata_end_date,
                        },
                        "aid": customer_id,
                    }
                }
            )

        # get current most visited pages data
        pipeline.extend(
            [
                {"$unwind": "$user_data"},
                {"$group": {"_id": None, "total": {"$sum": 1}}},
            ]
        )

        cursor = data_collection.aggregate(pipeline)
        result = await cursor.to_list(length=None)

        if result:
            current_count = result[0]["total"]
        else:
            current_count = 0

        total_current_count += current_count


        # get last most visited pages data
        lastdata_pipeline.extend(
            [
                {"$unwind": "$user_data"},
                {"$group": {"_id": None, "total": {"$sum": 1}}},
            ]
        )

        cursor = data_collection.aggregate(lastdata_pipeline)
        result = await cursor.to_list(length=None)

        if result:
            last_count = result[0]["total"]
        else:
            last_count = 0

        total_last_count += last_count


    return {
        "total_last_count": total_last_count,
        "total_current_count": total_current_count,
    }


# Get total visit time
async def get_session_duration(customer_id: str, array_weburl: str, period: str):
    total_last_visit_time = 0
    total_current_visit_time = 0

    for item in array_weburl:
        data_collection = database.get_collection(
            item.split(".")[0].replace("https://", "") + "_" + item.split(".")[1]
        )

        pipeline = []
        last_pipeline = []

        if period != "All Time":
            if period == "Last 7 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=6)

                # last data
                lastdata_end_date = end_date - timedelta(days=7)
                lastdata_start_date = end_date - timedelta(days=6)

            elif period == "Last 15 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=14)

                # last data
                lastdata_end_date = end_date - timedelta(days=15)
                lastdata_start_date = end_date - timedelta(days=14)

            elif period == "Last month":
                current_date = datetime.now()
                start_date = (
                    datetime(current_date.year, current_date.month - 1, 1)
                    if current_date.month > 1
                    else datetime(current_date.year - 1, 12, 1)
                )
                end_date = datetime(current_date.year, current_date.month, 1)

                # last data
                lastdata_start_date = (
                    datetime(current_date.year, current_date.month - 2, 1)
                    if current_date.month > 2
                    else datetime(current_date.year - 1, 12 + current_date.month - 2, 1)
                )
                lastdata_end_date = (
                    datetime(current_date.year, current_date.month - 1, 1)
                    if current_date.month > 1
                    else datetime(current_date.year - 1, 12, 1)
                )

            elif period == "Last year":
                current_date = datetime.now()
                start_date = datetime(current_date.year - 1, 1, 1)
                end_date = datetime(current_date.year, 1, 1)

                # last data
                lastdata_start_date = datetime(current_date.year - 2, 1, 1)
                lastdata_end_date = datetime(current_date.year - 1, 1, 1)

            pipeline.append(
                {
                    "$match": {
                        "timestamp": {
                            "$gte": start_date,
                            "$lt": end_date,
                        },
                        "aid": customer_id,
                    }
                }
            )
            last_pipeline.append(
                {
                    "$match": {
                        "timestamp": {
                            "$gte": lastdata_start_date,
                            "$lt": lastdata_end_date,
                        },
                        "aid": customer_id,
                    }
                }
            )

        # get current session duration data
        pipeline.extend(
            [
                {
                    "$group": {
                        "_id": None,
                        "total_visit_time": {"$sum": "$total_visit_time"},
                    }
                },
            ]
        )

        cursor = data_collection.aggregate(pipeline)
        result = await cursor.to_list(length=None)

        if result:
            current_visit_time = result[0]["total_visit_time"]
        else:
            current_visit_time = 0
        
        total_current_visit_time += current_visit_time


        # get last session duration data
        last_pipeline.extend(
            [
                {
                    "$group": {
                        "_id": None,
                        "total_visit_time": {"$sum": "$total_visit_time"},
                    }
                },
            ]
        )

        cursor = data_collection.aggregate(last_pipeline)
        result = await cursor.to_list(length=None)

        if result:
            last_visit_time = result[0]["total_visit_time"]
        else:
            last_visit_time = 0
        
        total_last_visit_time += last_visit_time
        
    return {
        "total_last_visit_time": total_last_visit_time,
        "total_current_visit_time": total_current_visit_time,
    }


# Get bounce rate
async def get_bounce_rate(customer_id: str, array_weburl: list, period: str):
    total_visit_count = 0
    total_last_visit_count = 0
    total_current_visit_count = 0

    for item in array_weburl:
        data_collection = database.get_collection(
            item.split(".")[0].replace("https://", "") + "_" + item.split(".")[1]
        )


        if period != "All Time":
            if period == "Last 7 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=6)

                # last data
                lastdata_end_date = end_date - timedelta(days=7)
                lastdata_start_date = end_date - timedelta(days=6)

            elif period == "Last 15 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=14)

                # last data
                lastdata_end_date = end_date - timedelta(days=15)
                lastdata_start_date = end_date - timedelta(days=14)

            elif period == "Last month":
                current_date = datetime.now()
                start_date = (
                    datetime(current_date.year, current_date.month - 1, 1)
                    if current_date.month > 1
                    else datetime(current_date.year - 1, 12, 1)
                )
                end_date = datetime(current_date.year, current_date.month, 1)

                # last data
                lastdata_start_date = (
                    datetime(current_date.year, current_date.month - 2, 1)
                    if current_date.month > 2
                    else datetime(current_date.year - 1, 12 + current_date.month - 2, 1)
                )
                lastdata_end_date = (
                    datetime(current_date.year, current_date.month - 1, 1)
                    if current_date.month > 1
                    else datetime(current_date.year - 1, 12, 1)
                )

            elif period == "Last year":
                current_date = datetime.now()
                start_date = datetime(current_date.year - 1, 1, 1)
                end_date = datetime(current_date.year, 1, 1)

                # last data
                lastdata_start_date = datetime(current_date.year - 2, 1, 1)
                lastdata_end_date = datetime(current_date.year - 1, 1, 1)
        

            current_visit_count = await data_collection.count_documents(
                {
                    "timestamp": {
                        "$gte": start_date,
                        "$lt": end_date,
                    },
                    "aid": customer_id,
                    "user_data": {
                        "$size": 1
                    },  # Only consider documents where the user_data array has a size of 1
                }
            )
            last_visit_count = await data_collection.count_documents(
                {
                    "timestamp": {
                        "$gte": lastdata_start_date,
                        "$lt": lastdata_end_date,
                    },
                    "aid": customer_id,
                    "user_data": {
                        "$size": 1
                    },  # Only consider documents where the user_data array has a size of 1
                }
            )
        else:
            current_visit_count = await data_collection.count_documents(
                {
                    "aid": customer_id,
                    "user_data": {
                        "$size": 1
                    },  # Only consider documents where the user_data array has a size of 1
                }
            )
            last_visit_count = current_visit_count

        total_count = await data_collection.count_documents({})

        total_visit_count += total_count
        total_last_visit_count += last_visit_count
        total_current_visit_count += current_visit_count

    return {
        "total_count": total_visit_count,
        "total_last_visit_count": total_last_visit_count,
        "total_current_visit_count": total_current_visit_count,
    }


# Get visitors location
async def get_visitors_location(array_weburl: list, period: str):
    total_visitors_location_data = []

    for item in array_weburl:
        data_collection = database.get_collection(
            item.split(".")[0].replace("https://", "") + "_" + item.split(".")[1]
        )

        # get visitors location
        pipeline = []

        if period != "All Time":
            if period == "Last 7 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=6)

            elif period == "Last 15 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=14)

            elif period == "Last month":
                today = datetime.today()
                first_day_of_month = today.replace(day=1)
                end_date = first_day_of_month - timedelta(days=1)
                start_date = end_date.replace(day=1)

            elif period == "Last year":
                end_date = datetime.today()
                start_date = end_date - timedelta(days=365)

            pipeline.append(
                {
                    "$match": {
                        "timestamp": {
                            "$gte": start_date,
                            "$lt": end_date,
                        },
                    }
                }
            )

        pipeline.extend(
            [
                {
                    "$lookup": {
                        "from": "e_data",
                        "localField": "ip_address",
                        "foreignField": "ip",
                        "as": "company_data",
                    }
                },
                {"$match": {"company_data": {"$exists": "true", "$ne": []}}},
                {
                    "$group": {
                        "_id": {"$first": "$company_data.company_info_1.city"},
                        "count": {"$sum": 1},
                    }
                },
                {"$sort": {"count": -1}},
                {"$limit": 4},
                {"$project": {"_id": 0, "city": "$_id", "count": 1}},
            ]
        )

        cursor = data_collection.aggregate(pipeline)
        result = await cursor.to_list(length=None)

        total_visitors_location_data.extend(result)

    total_visitors_location_data.sort(key=customArraySort, reverse=True)
    return total_visitors_location_data[:4]


# Get visited pages info
async def get_visited_pages_info(array_weburl: list, period: str):
    total_visited_pages_data = []

    for item in array_weburl:
        data_collection = database.get_collection(
            item.split(".")[0].replace("https://", "") + "_" + item.split(".")[1]
        )

        pipeline = []

        if period != "All Time":
            if period == "Last 7 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=6)

            elif period == "Last 15 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=14)

            elif period == "Last month":
                today = datetime.today()
                first_day_of_month = today.replace(day=1)
                end_date = first_day_of_month - timedelta(days=1)
                start_date = end_date.replace(day=1)

            elif period == "Last year":
                end_date = datetime.today()
                start_date = end_date - timedelta(days=365)

            pipeline.append(
                {
                    "$match": {
                        "timestamp": {
                            "$gte": start_date,
                            "$lt": end_date,
                        },
                    }
                }
            )

        pipeline.extend(
            [
                {"$unwind": "$user_data"},
                {
                    "$match": {
                        "user_data.document_title": {
                            "$exists": "True",
                            "$nin": ["", None],
                        }
                    }
                },
                {
                    "$group": {
                        "_id": "$user_data.document_title",
                        "count": {"$sum": 1},
                    }
                },
                {"$sort": {"count": -1}},
                {"$limit": 5},
                {"$project": {"_id": 0, "title": "$_id", "count": 1}},
            ]
        )

        cursor = data_collection.aggregate(pipeline)
        result = await cursor.to_list(length=None)

        total_visited_pages_data.extend(result)

    total_visited_pages_data.sort(key=customArraySort, reverse=True)
    return total_visited_pages_data[:5]


def customArraySort(k):
    return k["count"]


# Get visitor source
async def get_visitor_source(array_weburl: list, period: str):
    total_visitor_source_data = []

    for item in array_weburl:
        data_collection = database.get_collection(
            item.split(".")[0].replace("https://", "") + "_" + item.split(".")[1]
        )

        # get visitor source
        pipeline = []

        if period != "All Time":
            if period == "Last 7 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=6)

            elif period == "Last 15 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=14)

            elif period == "Last month":
                today = datetime.today()
                first_day_of_month = today.replace(day=1)
                end_date = first_day_of_month - timedelta(days=1)
                start_date = end_date.replace(day=1)

            elif period == "Last year":
                end_date = datetime.today()
                start_date = end_date - timedelta(days=365)

            pipeline.append(
                {
                    "$match": {
                        "timestamp": {
                            "$gte": start_date,
                            "$lt": end_date,
                        }
                    }
                }
            )

        pipeline.extend(
            [
                {
                    "$match": {
                        "user_data.referrer": {"$exists": "True", "$nin": ["", None]}
                    }
                },
                {"$unwind": {"path": "$user_data"}},
                {"$group": {"_id": "$user_data.referrer", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": 4},
                {"$project": {"_id": 0, "source": "$_id", "count": "$count"}},
            ]
        )

        cursor = data_collection.aggregate(pipeline)
        result = await cursor.to_list(length=None)

        total_visitor_source_data.extend(result)

    total_visitor_source_data.sort(key=customArraySort, reverse=True)
    return total_visitor_source_data[:4]


# Get lead profiles
async def get_lead_profiles(
    array_weburl: list, period: str, page_num: int, page_count: int
):
    total_lead_profiles = []

    for item in array_weburl:
        data_collection = database.get_collection(
            item.split(".")[0].replace("https://", "") + "_" + item.split(".")[1]
        )

        pipeline = []

        if period != "All Time":
            if period == "Last 7 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=6)

            elif period == "Last 15 days":
                end_date = datetime.now()
                start_date = end_date - timedelta(days=14)

            elif period == "Last month":
                today = datetime.today()
                first_day_of_month = today.replace(day=1)
                end_date = first_day_of_month - timedelta(days=1)
                start_date = end_date.replace(day=1)

            elif period == "Last year":
                end_date = datetime.today()
                start_date = end_date - timedelta(days=365)

            pipeline.append(
                {
                    "$match": {
                        "timestamp": {
                            "$gte": start_date,
                            "$lt": end_date,
                        },
                    }
                }
            )

        pipeline.extend(
            [
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
                        "visitors": "$user_data"
                    }
                },
            ]
        )

        cursor = data_collection.aggregate(pipeline)
        lead_profiles = await cursor.to_list(length=None)

        total_lead_profiles.extend(lead_profiles)

    page_total = len(total_lead_profiles)
    last_page = math.ceil(page_total / page_count)
    if page_num > last_page:
        page_num = last_page

    start = page_num * page_count
    end = start + page_count

    result = total_lead_profiles[start:end]

    for item in result:
        if item["brand"] != None:
            preferred_image = find_preferred_image(item["brand"])
            item["logo"] = preferred_image

    return {"data": result, "page_num": page_num, "page_total": last_page}


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
