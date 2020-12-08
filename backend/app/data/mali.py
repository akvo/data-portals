import json
from typing import Any, Dict, List

import pandas
from geojson import Feature, FeatureCollection, Point, load

from app.utils import path_to_dataset


def get_waterpoints_geojson() -> Dict[str, Any]:
    dataframe = pandas.read_csv(path_to_dataset("23112020_Mali_seasonality.csv"))
    dataframe = dataframe.where(pandas.notnull(dataframe), None)
    features = []
    for i in range(0, len(dataframe.index)):
        item = dataframe.loc[i]
        props = {
            "region": item.region,
            "functionality_main": item.functionality_main,
            "puits_safety": item.puits_safety,
            "seasonality": item.seasonality,
            "photo": item.photo,
        }
        try:
            feature = Feature(
                geometry=Point((float(item.longitude), float(item.latitude))),
                properties=props,
                id=f"{item.longitude},{item.latitude}",
            )
            features.append(feature)
        except ValueError:
            pass

    return FeatureCollection(features)


def get_region_names() -> List[str]:
    dataframe = pandas.read_csv(path_to_dataset("23112020_Mali_seasonality.csv"))
    dataframe = dataframe.where(pandas.notnull(dataframe), None)

    return list(dataframe.region.unique())


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


def get_commune_geojson() -> FeatureCollection:
    cercles_df = pandas.read_csv(path_to_dataset("Lars_data_cercle.csv"))
    cercles_df = cercles_df.set_index("Cercle")
    communes_df = pandas.read_csv(path_to_dataset("Lars_data_commune.csv"))
    communes_df = communes_df.set_index("Commune")

    with open(path_to_dataset("mli_admbnda_adm3_pop_2017.geojson"), "r") as fp:
        communes_geo = load(fp)

    for f in communes_geo["features"]:
        commune_props = f["properties"]
        cercle_name = commune_props["admin2_nam"]
        commune_name = commune_props["admin3_nam"]
        cercle_data = (
            cercles_df.loc[cercle_name].to_dict()
            if cercle_name in cercles_df.index
            else {}
        )
        commune_data = (
            communes_df.loc[commune_name].to_dict()
            if commune_name in communes_df.index
            else {}
        )
        f["properties"] = {
            "objectid": commune_props["objectid"],
            "admin2_nam": cercle_name,
            "admin3_nam": commune_props["admin3_nam"],
            "pop2017_to": commune_props["pop2017_to"],
            "milieu": commune_data.get("Milieu", None),
            "taux_fonct": round(cercle_data.get("taux_fonct", 0)),
            "taux_acces": round(cercle_data.get("taux_acces", 0)),
            "taux_equip": round(cercle_data.get("taux_equip", 0)),
        }

    return communes_geo


def get_cercles_data() -> List[Dict[str, Any]]:
    df = pandas.read_csv(path_to_dataset("Lars_data_cercle.csv"))
    df = df.where(pandas.notnull(df), None)
    return df.to_dict("records")


def get_communes_data() -> List[Dict[str, Any]]:
    df = pandas.read_csv(path_to_dataset("Lars_data_commune.csv"))
    df = df.where(pandas.notnull(df), None)
    return df.to_dict("records")
