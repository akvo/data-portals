import json
from typing import Any, Dict, Union

import requests
from fastapi import APIRouter, Request
from fastapi.responses import FileResponse

from app.data import mali
from app.utils import path_to_dataset, tmp_file_cache

router = APIRouter()


@router.get("/mali/project-updates")
def get_project_updates(request: Request, page: int = 1, limit: int = 10) -> Any:
    params: Dict[str, Union[str, int]] = {
        "filter": json.dumps({"project__in": [3750, 3792, 3793]}),
        "sorting": "-event_date",
        "limit": limit,
        "page": page,
    }
    response = requests.get(
        "https://rsr.akvo.org/rest/v1/project_update/",
        params=params,
        headers={"Accept": "application/json"},
    )
    data = response.json()
    results = [
        {
            "id": it["id"],
            "title": it["title"],
            "text": it["text"],
            "photo": it["photo"],
            "url": "https://rsr.akvo.org{}".format(it["absolute_url"]),
        }
        for it in data["results"]
    ]

    return results if "count" in data else []


@router.get("/mali/resources")
def get_resources() -> Any:
    filename = tmp_file_cache("mali-resources", mali.get_resources_media, fresh=True)
    return FileResponse(filename)


@router.get("/mali/communes.geojson")
def get_communes_geojson() -> Any:
    filename = tmp_file_cache("mali-commune.geojson", mali.get_commune_geojson)
    return FileResponse(filename)


@router.get("/mali/cercles-data.json")
def get_cercles_data() -> Any:
    filename = tmp_file_cache("mali-cercles-data.json", mali.get_cercles_data)
    return FileResponse(filename)


@router.get("/mali/communes-data.json")
def get_communes_data() -> Any:
    filename = tmp_file_cache("mali-communes-data.json", mali.get_communes_data)
    return FileResponse(filename)


@router.get("/mali/possible-progress.json")
def get_possible_progres_json() -> Any:
    return FileResponse(path_to_dataset("mali/possible-progress.json"))


@router.get("/mali/additional-people.json")
def get_additional_people_json() -> Any:
    return FileResponse(path_to_dataset("mali/additional-people.json"))


@router.get("/mali/pump-safety.json")
def get_pump_safety_json() -> Any:
    return FileResponse(path_to_dataset("mali/pump-safety.json"))


@router.get("/mali/waterpoints.geojson")
def get_waterpoints_geojson() -> Any:
    filename = tmp_file_cache("mali-waterpoints.geojson", mali.get_waterpoints_geojson)
    return FileResponse(filename)


@router.get("/mali/functionality-percentage-per-region.geojson")
def get_functionality_percentage_per_region_geojson() -> Any:
    filename = tmp_file_cache(
        "mali-functionality-percentage-per-region.geojson",
        mali.get_functionality_percentage_per_region_geojson,
    )
    return FileResponse(filename)


@router.get("/mali/population-per-region.geojson")
def get_population_per_region_geojson() -> Any:
    filename = tmp_file_cache(
        "mali-population-per-region.geojson", mali.get_population_per_region_geojson
    )
    return FileResponse(filename)


@router.get("/mali/region-names.json")
def get_region_names() -> Any:
    filename = tmp_file_cache("mali-region-names.json", mali.get_region_names)
    return FileResponse(filename)


@router.get("/mali/abandonment.json")
def get_abandonment_json() -> Any:
    return FileResponse(path_to_dataset("mali/abandonment.json"))


@router.get("/mali/distance.json")
def get_distance_json() -> Any:
    return FileResponse(path_to_dataset("mali/distance.json"))


@router.get("/mali/mechanic-vs-manual-pump.json")
def get_mechanic_vs_manual_pump_json() -> Any:
    return FileResponse(path_to_dataset("mali/mechanic-vs-manual-pump.json"))


@router.get("/mali/pollution-type.json")
def get_pollution_type_json() -> Any:
    return FileResponse(path_to_dataset("mali/pollution-type.json"))


@router.get("/mali/pump-type.json")
def get_pump_type_json() -> Any:
    return FileResponse(path_to_dataset("mali/pump-type.json"))


@router.get("/mali/treatment-type.json")
def get_treatment_type_json() -> Any:
    return FileResponse(path_to_dataset("mali/treatment-type.json"))
