from csv import DictReader
from decimal import Decimal
from typing import Any

from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.data import mali
from app.utils import path_to_dataset, tmp_file_cache

router = APIRouter()


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
    return FileResponse(path_to_dataset("possible-progress.json"))


@router.get("/mali/additional-people.json")
def get_additional_people_json() -> Any:
    return FileResponse(path_to_dataset("additional-people.json"))


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
    return FileResponse(path_to_dataset("abandonment.json"))


@router.get("/mali/distance.json")
def get_distance_json() -> Any:
    return FileResponse(path_to_dataset("distance.json"))


@router.get("/mali/mechanic-vs-manual-pump.json")
def get_mechanic_vs_manual_pump_json() -> Any:
    return FileResponse(path_to_dataset("mechanic-vs-manual-pump.json"))


@router.get("/mali/pollution-type.json")
def get_pollution_type_json() -> Any:
    return FileResponse(path_to_dataset("pollution-type.json"))


@router.get("/mali/pump-type.json")
def get_pump_type_json() -> Any:
    return FileResponse(path_to_dataset("pump-type.json"))


@router.get("/mali/treatment-type.json")
def get_treatment_type_json() -> Any:
    return FileResponse(path_to_dataset("treatment-type.json"))


@router.get("/functionality-rate-by-region")
async def get_functionality_rate_by_region() -> Any:
    with open(
        path_to_dataset("Taux de fonctionalité par region - Blad1.csv"), "r"
    ) as csvfile:
        reader = DictReader(csvfile)
        return [
            {
                "Region": row["REGION"],
                "PMH": Decimal(row["PMH"].rstrip("%").replace(",", ".")),
                "Puits": Decimal(row["Puits "].rstrip("%").replace(",", ".")),
                "SAEP": Decimal(row["SAEP"].rstrip("%").replace(",", ".")),
            }
            for row in reader
        ]


@router.get("/site-points.geojson")
def get_site_points_raw() -> Any:
    return FileResponse(path_to_dataset("site_points_deau_mali.geojson"))
