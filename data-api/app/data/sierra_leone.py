from typing import Any, Dict

import pandas
from geojson import Feature, FeatureCollection, Point

from app.utils import path_to_dataset


def get_households_geojson() -> Dict[str, Any]:
    dataframe = pandas.read_csv(path_to_dataset("sierra-leone/SL_subset2.csv"))
    dataframe = dataframe.where(pandas.notnull(dataframe), None)
    features = []
    for i in range(0, len(dataframe.index)):
        item = dataframe.loc[i]
        props = {
            "region": item.location_region,
            "district": item.location_district,
            "chiefdom": item.location_chiefdom,
            "info": item.sdg_improved_source,
        }
        try:
            feature = Feature(
                geometry=Point(
                    (
                        float(item.geolocation_longitude),
                        float(item.geolocation_latitude),
                    )
                ),
                properties=props,
                id=f"{item.geolocation_longitude},{item.geolocation_latitude}",
            )
            features.append(feature)
        except ValueError:
            pass

    return FeatureCollection(features)


def get_waterpoints_geojson() -> Dict[str, Any]:
    dataframe = pandas.read_csv(
        path_to_dataset("sierra-leone/SL_wells.csv"), delimiter=";"
    )
    dataframe = dataframe.where(pandas.notnull(dataframe), None)
    features = []
    for i in range(0, len(dataframe.index)):
        item = dataframe.loc[i]
        longitude = item["geo longitude"]
        latitude = item["geo latitude"]
        props = {
            "province": item.province,
            "district": item.district,
            "chiefdom": item.chiefdom,
            "info": item.water_supply_type,
        }
        try:
            feature = Feature(
                geometry=Point((float(longitude), float(latitude),)),
                properties=props,
                id=f"{longitude},{latitude}",
            )
            features.append(feature)
        except ValueError:
            pass

    return FeatureCollection(features)
