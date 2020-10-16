import os
import json
import pandas
from geojson import FeatureCollection, Feature, Point


def get_waterpoints_geojson() -> dict:
    data_file = os.path.realpath(
        os.path.join(
            os.getcwd(),
            os.path.dirname(__file__),
            "../../datasets/07102020_Mali_map.csv",
        )
    )
    dataframe = pandas.read_csv(data_file)
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


def get_functionality_percentage_per_region_geojson() -> dict:
    geo_file = os.path.realpath(
        os.path.join(
            os.getcwd(), os.path.dirname(__file__), "../../datasets/mli_hdx.json"
        )
    )

    data_file = os.path.realpath(
        os.path.join(
            os.getcwd(),
            os.path.dirname(__file__),
            "../../datasets/functionality_wp_mali.csv",
        )
    )

    region_df = pandas.read_csv(data_file, sep=";")
    region_data = region_df.set_index("ADM1_FR")["Percentage"].to_dict()

    with open(geo_file, "r") as fp:
        region_geo = json.load(fp)

    for f in region_geo["features"]:
        region = f["properties"]["admin1Name"]
        f["properties"] = {"region": region, "value": region_data[region]}

    return region_geo


def get_population_per_region_geojson() -> dict:
    geo_file = os.path.realpath(
        os.path.join(
            os.getcwd(), os.path.dirname(__file__), "../../datasets/mli_hdx.json"
        )
    )

    data_file = os.path.realpath(
        os.path.join(
            os.getcwd(),
            os.path.dirname(__file__),
            "../../datasets/Mali_populationV8_model_short.csv",
        )
    )

    region_df = pandas.read_csv(data_file)
    region_data = region_df.set_index("ADM1_FR")["Pop.2016"].to_dict()

    with open(geo_file, "r") as fp:
        region_geo = json.load(fp)

    for f in region_geo["features"]:
        region = f["properties"]["admin1Name"]
        f["properties"] = {"region": region, "value": region_data.get(region, 0)}

    return region_geo
