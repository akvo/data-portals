from typing import Any

from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.data import sierra_leone
from app.utils import tmp_file_cache

router = APIRouter()


@router.get("/households.geojson")
def get_households_geojson() -> Any:
    filename = tmp_file_cache(
        "sierra-leone-households.geojson",
        sierra_leone.get_households_geojson,
        fresh=True,
    )
    return FileResponse(filename)


@router.get("/waterpoints.geojson")
def get_waterpoints_geojson() -> Any:
    filename = tmp_file_cache(
        "sierra-leone-waterpoints.geojson",
        sierra_leone.get_waterpoints_geojson,
        fresh=True,
    )
    return FileResponse(filename)


@router.get("/water-quality-summary.json")
def get_water_quality_summary_json() -> Any:
    filename = tmp_file_cache(
        "sierra-leone-water-quality-summary.json",
        sierra_leone.get_water_quality_summary,
        fresh=True,
    )
    return FileResponse(filename)


@router.get("/shared-facility-summary.json")
def get_shared_facilities_summary_json() -> Any:
    filename = tmp_file_cache(
        "sierra-leone-get-shared-facility-summary.json",
        sierra_leone.get_shared_facilities_summary,
        fresh=True,
    )
    return FileResponse(filename)


@router.get("/unimproved-reason-summary.json")
def get_unimproved_reason_summary_json() -> Any:
    filename = tmp_file_cache(
        "sierra-leone-get-unimproved-reason-summary.json",
        sierra_leone.get_unimproved_reason_summary,
        fresh=True,
    )
    return FileResponse(filename)
