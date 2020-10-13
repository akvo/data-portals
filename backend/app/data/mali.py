import os
import json
import pandas


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
