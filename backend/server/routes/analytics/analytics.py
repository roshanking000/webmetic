from fastapi import APIRouter, Depends
from datetime import datetime, timedelta, time

from server.database import database
from server.auth.auth_bearer import JWTBearer

router = APIRouter()

data_collection = None


@router.get("/get_analytics_data", dependencies=[Depends(JWTBearer())])
async def get_analytics_data(weburl, period):
    array_weburl = weburl.split(",")
    live_user_data = await get_live_user_data(array_weburl)
    engaged_session_data = await get_engaged_sessions_info(array_weburl, period)
    visited_pages_data = await get_visited_pages_info(array_weburl, period)
    company_data = await get_company_data(array_weburl, period)
    return {
        "data": {
            "live_user_count": live_user_data,
            "engaged_session_data": engaged_session_data,
            "visited_pages_data": visited_pages_data,
            "company_data": company_data,
        },
        "status": "success",
    }


@router.get("/get_report_data", dependencies=[Depends(JWTBearer())])
async def get_report_data(weburl, period):
    array_weburl = weburl.split(",")
    reportData = await getReportData(array_weburl, period)
    return {"status": "success", "data": reportData}


# Get report data
async def getReportData(array_weburl: list, period: str):
    report_data = []
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
            {"$unwind": {"path": "$company_data"}},
            {
                "$project": {
                    "_id": 0,
                    "Datum": {
                        "$dateToString": {
                            "format": "%H:%M, %d.%m.%Y",
                            "date": "$timestamp",
                        }
                    },
                    "Besuchszeit": {
                        "$cond": {
                            "if": {"$gt": ["$total_visit_time", 600]},
                            "then": ">10m",
                            "else": {
                                "$concat": [
                                    {
                                        "$toString": {
                                            "$floor": {
                                                "$divide": ["$total_visit_time", 60]
                                            }
                                        }
                                    },
                                    "m ",
                                    {
                                        "$toString": {
                                            "$floor": {
                                                "$mod": ["$total_visit_time", 60]
                                            }
                                        }
                                    },
                                    "s",
                                ]
                            },
                        }
                    },
                    "Unternehmen": "$company_data.company_info_1.org",
                    "Stadt": "$company_data.company_info_1.city",
                    "Startseite": {
                        "$reduce": {
                            "input": {
                                "$slice": [
                                    {
                                        "$split": [
                                            {
                                                "$arrayElemAt": [
                                                    {
                                                        "$split": [
                                                            {
                                                                "$arrayElemAt": [
                                                                    "$user_data.document_location",
                                                                    0,
                                                                ]
                                                            },
                                                            "?",
                                                        ]
                                                    },
                                                    0,
                                                ]
                                            },
                                            "/",
                                        ]
                                    },
                                    3,
                                    {
                                        "$size": {
                                            "$split": [
                                                {
                                                    "$arrayElemAt": [
                                                        "$user_data.document_location",
                                                        0,
                                                    ]
                                                },
                                                "/",
                                            ]
                                        }
                                    },
                                ]
                            },
                            "initialValue": "",
                            "in": {
                                "$cond": {
                                    "if": {"$eq": ["$$this", ""]},
                                    "then": "$$value",
                                    "else": {"$concat": ["$$value", "/", "$$this"]},
                                }
                            },
                        }
                    },
                    "Referrer": {
                        "$arrayElemAt": [{"$split": ["$external_referrer", "?"]}, 0]
                    },
                }
            },
        ]

        cursor = data_collection.aggregate(pipeline)
        result = await cursor.to_list(length=None)
        return result


# Get live user data
async def get_live_user_data(array_weburl: list):
    live_user_data = []

    for item in array_weburl:
        data_collection = database.get_collection(
            item.split(".")[0].replace("https://", "") + "_" + item.split(".")[1]
        )

        end_date = datetime.now()
        start_date = datetime.combine(datetime.now().date(), time())

        pipeline = [
            {
                "$match": {
                    "timestamp": {
                        "$gte": start_date,
                        "$lt": end_date,
                    },
                }
            },
            {"$unwind": "$user_data"},
            {"$group": {"_id": 0, "totalcount": {"$sum": 1}}},
            {
                "$project": {
                    "_id": 0,
                    "count": "$totalcount",
                }
            },
        ]
        cursor = data_collection.aggregate(pipeline)
        result = await cursor.to_list(length=None)

        if len(result) == 0:
            if item == array_weburl[0]:
                live_user_data.append({"count": 0, "date": start_date.date()})
            else:
                live_user_data[0]["count"] = 0
        else:
            if item == array_weburl[0]:
                live_user_data.append(
                    {"count": result[0]["count"], "date": start_date.date()}
                )
            else:
                live_user_data[0]["count"] += result[0]["count"]

        for i in range(0, 5):
            current_date = datetime.combine(datetime.now().date(), time())
            end_date = current_date - timedelta(days=i * 10)
            start_date = end_date - timedelta(days=10)

            pipeline = [
                {
                    "$match": {
                        "timestamp": {
                            "$gte": start_date,
                            "$lt": end_date,
                        },
                    }
                },
                {"$unwind": "$user_data"},
                {"$group": {"_id": 0, "totalcount": {"$sum": 1}}},
                {
                    "$project": {
                        "_id": 0,
                        "count": "$totalcount",
                    }
                },
            ]
            cursor = data_collection.aggregate(pipeline)
            result = await cursor.to_list(length=None)

            if len(result) == 0:
                if item == array_weburl[0]:
                    live_user_data.append({"count": 0, "date": start_date.date()})
            else:
                if item == array_weburl[0]:
                    live_user_data.append(
                        {"count": result[0]["count"], "date": start_date.date()}
                    )
                else:
                    live_user_data[i + 1]["count"] = (
                        live_user_data[i + 1]["count"] + result[0]["count"]
                    )

    data_exist = False
    for item in live_user_data:
        if item["count"] != 0:
            data_exist = True
    if data_exist == False:
        return []
    return live_user_data


# Get visited pages info
async def get_visited_pages_info(array_weburl: list, period: str):
    visited_pages_result = []

    for item in array_weburl:
        data_collection = database.get_collection(
            item.split(".")[0].replace("https://", "") + "_" + item.split(".")[1]
        )

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
                    }
                }
            )

        pipeline.extend(
            [
                {"$unwind": "$user_data"},
                {
                    "$group": {
                        "_id": "$user_data.document_title",
                        "total_visitor": {"$sum": 1},
                        "session_time": {"$sum": "$user_data.time_spent"},
                        "bounce_rate": {"$avg": "$user_data.scroll_depth"},
                    }
                },
                {"$sort": {"total_visitor": -1}},
                {
                    "$project": {
                        "_id": 0,
                        "page_name": "$_id",
                        "total_visitor": "$total_visitor",
                        "session_time": "$session_time",
                        "bounce_rate": {"$avg": "$bounce_rate"},
                        "website_url": item,
                    }
                },
            ]
        )

        if period != "All Time":
            lastdata_pipeline = [
                {
                    "$match": {
                        "timestamp": {
                            "$gte": lastdata_start_date,
                            "$lt": lastdata_end_date,
                        },
                    }
                },
                {"$unwind": "$user_data"},
                {
                    "$group": {
                        "_id": "$user_data.document_title",
                        "total_visitor": {"$sum": 1},
                        "session_time": {"$sum": "$user_data.time_spent"},
                        "bounce_rate": {"$avg": "$user_data.scroll_depth"},
                    }
                },
                {"$sort": {"total_visitor": -1}},
                {
                    "$project": {
                        "_id": 0,
                        "page_name": "$_id",
                        "total_visitor": "$total_visitor",
                        "session_time": "$session_time",
                        "bounce_rate": {"$avg": "$bounce_rate"},
                        "website_url": item,
                    }
                },
            ]

        cursor = data_collection.aggregate(pipeline)
        result = await cursor.to_list(length=None)

        if period != "All Time":
            cursor = data_collection.aggregate(lastdata_pipeline)
            lastdata_result = await cursor.to_list(length=None)

            for current_item in result:
                flag = 0
                for last_item in lastdata_result:
                    if (
                        current_item["page_name"] == last_item["page_name"]
                        and flag == 0
                    ):
                        if last_item["session_time"] == 0:
                            current_item["session_time_percent"] = 0
                            current_item["session_time_status"] = "increase"
                        else:
                            if current_item["session_time"] > last_item["session_time"]:
                                current_item["session_time_percent"] = (
                                    (
                                        current_item["session_time"]
                                        - last_item["session_time"]
                                    )
                                    / last_item["session_time"]
                                ) * 100
                                current_item["session_time_status"] = "increase"
                            else:
                                current_item["session_time_percent"] = (
                                    (
                                        last_item["session_time"]
                                        - current_item["session_time"]
                                    )
                                    / last_item["session_time"]
                                ) * 100
                                current_item["session_time_status"] = "decrease"

                        current_item["bounce_rate_status"] = (
                            "increase"
                            if current_item["bounce_rate"] > last_item["bounce_rate"]
                            else "decrease"
                        )
                        flag = 1
                if flag == 0:
                    current_item["session_time_percent"] = 0

        visited_pages_result.extend(result)

    visited_pages_result.sort(key=customVisitedPagesDataSort, reverse=True)
    return visited_pages_result


def customVisitedPagesDataSort(k):
    return k["total_visitor"]


# Get company data
async def get_company_data(website_url: str, period: str):
    company_data = []

    for item in website_url:
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
                current_date = datetime.now()
                start_date = (
                    datetime(current_date.year, current_date.month - 1, 1)
                    if current_date.month > 1
                    else datetime(current_date.year - 1, 12, 1)
                )
                end_date = datetime(current_date.year, current_date.month, 1)

            elif period == "Last year":
                current_date = datetime.now()
                start_date = datetime(current_date.year - 1, 1, 1)
                end_date = datetime(current_date.year, 1, 1)

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
                        "_id": {
                            "name": {"$first": "$company_data.company_info_1.isp"},
                            "brand": {"$ifNull": [{"$first": "$company_data.brand"}, None]}
                        },
                        "count": {"$sum": 1},
                    }
                },
                {"$sort": {"count": -1}},
                {
                    "$project": {
                        "_id": 0,
                        "brand": "$_id.brand",
                        "company_name": "$_id.name",
                        "count": 1,
                        "website_url": item,
                    }
                },
            ]
        )

        cursor = data_collection.aggregate(pipeline)
        result = await cursor.to_list(length=None)

        company_data.extend(result)

    for item in company_data:
        if item["brand"] != None:
            preferred_image = find_preferred_image(item["brand"])
            item["logo"] = preferred_image

    company_data.sort(key=customCompanyDataSort, reverse=True)
    return company_data


def customCompanyDataSort(k):
    return k["count"]


# Get engaged sessions info
async def get_engaged_sessions_info(array_weburl: list, period: str):
    total_engaged_sessions_result = []

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
                current_date = datetime.now()
                start_date = (
                    datetime(current_date.year, current_date.month - 1, 1)
                    if current_date.month > 1
                    else datetime(current_date.year - 1, 12, 1)
                )
                end_date = datetime(current_date.year, current_date.month, 1)

            elif period == "Last year":
                current_date = datetime.now()
                start_date = datetime(current_date.year - 1, 1, 1)
                end_date = datetime(current_date.year, 1, 1)

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
                    "$group": {
                        "_id": "$user_data.document_title",
                        "average_scroll_depth": {"$avg": "$user_data.scroll_depth"},
                        "total_session_count": {"$sum": 1},
                        "engaged_session_count": {
                            "$sum": {
                                "$cond": {
                                    "if": {
                                        "$or": [
                                            {"$gt": ["$user_data.time_spent", 10]},
                                            {
                                                "$gt": [
                                                    {"$size": "$user_data.user_events"},
                                                    0,
                                                ]
                                            },
                                        ]
                                    },
                                    "then": 1,
                                    "else": 0,
                                }
                            }
                        },
                    }
                },
                {"$sort": {"average_scroll_depth": -1}},
                {
                    "$project": {
                        "_id": 0,
                        "page_name": "$_id",
                        "engaged_rate": {
                            "$multiply": [
                                {
                                    "$divide": [
                                        "$engaged_session_count",
                                        "$total_session_count",
                                    ]
                                },
                                100,
                            ]
                        },
                        "average_scroll_depth": "$average_scroll_depth",
                        "domain": item,
                    }
                },
            ]
        )

        cursor = data_collection.aggregate(pipeline)
        result = await cursor.to_list(length=None)

        total_engaged_sessions_result.extend(result)

    total_engaged_sessions_result.sort(key=customEngagedSessionSort, reverse=True)
    return total_engaged_sessions_result


def customEngagedSessionSort(k):
    return k["engaged_rate"]


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
