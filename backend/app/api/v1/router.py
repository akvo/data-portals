import os
from csv import DictReader
from decimal import Decimal
from typing import Any

from fastapi import APIRouter
from fastapi.responses import FileResponse
from app.data import mali

router = APIRouter()


@router.get("/mali/functionality-percentage-per-region.geojson")
def get_functionality_percentage_per_region_geojson() -> Any:
    return mali.get_functionality_percentage_per_region_geojson()


@router.get("/functionality-rate-by-region")
async def get_functionality_rate_by_region() -> Any:
    filename = os.path.realpath(
        os.path.join(
            os.getcwd(),
            os.path.dirname(__file__),
            "../../../datasets/Taux de fonctionalité par region - Blad1.csv",
        )
    )

    with open(filename, "r") as csvfile:
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
    filename = os.path.realpath(
        os.path.join(
            os.getcwd(),
            os.path.dirname(__file__),
            "../../../datasets/site_points_deau_mali.geojson",
        )
    )
    return FileResponse(filename)
