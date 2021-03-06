import json
from typing import Any, Dict, List

import pandas
from geojson import Feature, FeatureCollection, Point, load
from slugify import slugify

from app.utils import path_to_dataset


def get_waterpoints_geojson() -> Dict[str, Any]:
    dataframe = pandas.read_csv(path_to_dataset("mali/23112020_Mali_seasonality.csv"))
    dataframe = dataframe.where(pandas.notnull(dataframe), None)
    features = []
    for i in range(0, len(dataframe.index)):
        item = dataframe.loc[i]
        props = {
            "region": item.region,
            "functionality_main": item.functionality_main,
            "puits_safety": item.puits_safety,
            "seasonality": item.seasonality,
            "water_months": item.water_months,
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
    dataframe = pandas.read_csv(path_to_dataset("mali/23112020_Mali_seasonality.csv"))
    dataframe = dataframe.where(pandas.notnull(dataframe), None)

    return list(dataframe.region.unique())


def get_functionality_percentage_per_region_geojson() -> Dict[str, Any]:
    region_df = pandas.read_csv(
        path_to_dataset("mali/functionality_wp_mali.csv"), sep=";"
    )
    region_data = region_df.set_index("ADM1_FR")["Percentage"].to_dict()

    with open(path_to_dataset("mali/mli_hdx.json"), "r") as fp:
        region_geo = json.load(fp)

    for f in region_geo["features"]:
        region = f["properties"]["admin1Name"]
        f["properties"] = {"region": region, "value": region_data[region]}

    return region_geo


def get_population_per_region_geojson() -> Dict[str, Any]:
    region_df = pandas.read_csv(
        path_to_dataset("mali/Mali_populationV8_model_short.csv")
    )
    region_data = region_df.set_index("ADM1_FR")["Pop.2016"].to_dict()

    with open(path_to_dataset("mali/mli_hdx.json"), "r") as fp:
        region_geo = json.load(fp)

    for f in region_geo["features"]:
        region = f["properties"]["admin1Name"]
        f["properties"] = {"region": region, "value": region_data.get(region, 0)}

    return region_geo


def get_commune_geojson() -> FeatureCollection:
    cercles_df = pandas.read_csv(path_to_dataset("mali/Lars_data_cercle.csv"))
    cercles_df = cercles_df.set_index("Cercle")
    communes_df = pandas.read_csv(path_to_dataset("mali/Lars_data_commune.csv"))
    communes_df = communes_df.set_index("Commune")

    with open(path_to_dataset("mali/mli_admbnda_adm3_pop_2017.geojson"), "r") as fp:
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
            "pop_2016": cercle_data.get("pop_2016", 0),
            "taux_fonct": round(cercle_data.get("taux_fonct", 0)),
            "taux_acces": round(cercle_data.get("taux_acces", 0)),
            "taux_equip": round(cercle_data.get("taux_equip", 0)),
        }

    return communes_geo


def get_cercles_data() -> List[Dict[str, Any]]:
    df = pandas.read_csv(path_to_dataset("mali/Lars_data_cercle.csv"))
    df = df.where(pandas.notnull(df), None)
    return df.to_dict("records")


def get_communes_data() -> List[Dict[str, Any]]:
    df = pandas.read_csv(path_to_dataset("mali/Lars_data_commune.csv"))
    df = df.where(pandas.notnull(df), None)
    return df.to_dict("records")


def get_resources_media() -> List[Dict[str, Any]]:
    dataframe = pandas.read_csv(
        path_to_dataset("mali/Media-Library-Export-2020-December-21-1352.csv")
    )
    dataframe = dataframe.where(pandas.notnull(dataframe), None)
    resources = []
    for i in range(0, len(dataframe.index)):
        item = dataframe.loc[i]
        files = [item._media_lib_file]
        if item._media_lib_file2:
            files.append(item._media_lib_file2)
        resources.append(
            {
                "id": int(item.ID),
                "title": item.Title,
                "slug": slugify(item.Title),
                "content": item.Content,
                "date": item.Date,
                "locations": item.Locations.split("|") if item.Locations else [],
                "types": item.Types.split("|") if item.Types else [],
                "categories": item.Categories.split("|") if item.Categories else [],
                "author": item._media_lib_author,
                "files": files,
            }
        )

    return resources
