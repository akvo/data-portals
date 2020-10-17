import json
from typing import Any, Dict

import pandas
from geojson import Feature, FeatureCollection, Point

from app.utils import path_to_dataset


def get_waterpoints_geojson() -> Dict[str, Any]:
    dataframe = pandas.read_csv(path_to_dataset("07102020_Mali_map.csv"))
    dataframe = dataframe.where(pandas.notnull(dataframe), None)
    features = []
    for i in range(0, len(dataframe.index)):
        item = dataframe.loc[i]
        props = {
            "functionality_main": item.functionality_main,
            "puits_safety": item.puits_safety,
            "photo": item.photo,
        }
        try:
            feature = Feature(
                geometry=Point((float(item.longitude), float(item.latitude))),
                properties=props,
                id=item.identifier,
            )
            features.append(feature)
        except ValueError:
            pass

    return FeatureCollection(features)


def get_functionality_percentage_per_region_geojson() -> Dict[str, Any]:
    region_df = pandas.read_csv(path_to_dataset("functionality_wp_mali.csv"), sep=";")
    region_data = region_df.set_index("ADM1_FR")["Percentage"].to_dict()

    with open(path_to_dataset("mli_hdx.json"), "r") as fp:
        region_geo = json.load(fp)

    for f in region_geo["features"]:
        region = f["properties"]["admin1Name"]
        f["properties"] = {"region": region, "value": region_data[region]}

    return region_geo


def get_population_per_region_geojson() -> Dict[str, Any]:
    region_df = pandas.read_csv(path_to_dataset("Mali_populationV8_model_short.csv"))
    region_data = region_df.set_index("ADM1_FR")["Pop.2016"].to_dict()

    with open(path_to_dataset("mli_hdx.json"), "r") as fp:
        region_geo = json.load(fp)

    for f in region_geo["features"]:
        region = f["properties"]["admin1Name"]
        f["properties"] = {"region": region, "value": region_data.get(region, 0)}

    return region_geo
