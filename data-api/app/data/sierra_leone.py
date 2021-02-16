from collections import OrderedDict
from typing import Any, Dict, List

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
            "sdg_improved_source": item.sdg_improved_source,
            "sdg_round_trip": item.sdg_round_trip,
            "sdg_sanitation": item.sdg_sanitation,
            "sdg_hand_washing": item.sdg_hand_washing,
            "toilet_facility_type": item.toilet_facility_type,
            "flush_to": item.flush_to,
            "share_facility": item.share_facility,
            "hand_wash_observe": item.hand_wash_observe,
            "risk_level_ecoli": item["risk.level.ecoli"],
            "mpn_per_100ml": item["mpn.100ml"],
            "conf_inter_ecoli": item.conf_inter_ecoli,
            "photo_ecoli": item.photo_ecoli,
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
            "water_supply_type": item.water_supply_type,
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


def get_waterpointdata_geojson() -> Dict[str, Any]:
    dataframe = pandas.read_csv(path_to_dataset("sierra-leone/WPDx_SL.csv"))
    dataframe = dataframe.where(pandas.notnull(dataframe), None)
    features = []
    for i in range(0, len(dataframe.index)):
        item = dataframe.loc[i]
        longitude = item["#lon_deg"]
        latitude = item["#lat_deg"]
        props = {
            "adm1": item["#adm1"],
            "adm2": item["#adm2"],
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


def get_water_quality_summary() -> Dict[str, Any]:
    dataframe = pandas.read_csv(path_to_dataset("sierra-leone/SL_subset2.csv"))
    summary = (
        dataframe.groupby(["risk.level.ecoli"])["conf_inter_ecoli", "mpn.100ml"]
        .mean()
        .sort_values(by=["mpn.100ml"])
        .rename(columns={"mpn.100ml": "mpn_100ml"})
    )

    return summary.to_dict()


def get_shared_facilities_summary() -> List[Dict[str, Any]]:
    facilities = ["Open Defecation", "Unimproved", "Improved"]
    result = OrderedDict((facility, {"facility": facility}) for facility in facilities)
    dataframe = pandas.read_csv(path_to_dataset("sierra-leone/SL_subset2.csv"))
    summary = dataframe.groupby(["sdg_sanitation", "share_facility"]).size().to_dict()
    for (facility, shared), size in summary.items():
        result[facility][shared] = size

    return [val for val in result.values()]


def get_unimproved_reason_summary() -> List[Dict[str, Any]]:
    dataframe = pandas.read_csv(path_to_dataset("sierra-leone/SL_subset2.csv"))
    unimproved = dataframe[dataframe["sdg_sanitation"] == "Unimproved"]
    facility_types = (
        unimproved.groupby(["toilet_facility_type"]).size().sort_values(ascending=False)
    )
    result = {"facility": "Unimproved"}
    for type, size in facility_types.items():
        result[type] = size

    return [result]


def get_reported_water_sources_summary() -> List[Dict[str, Any]]:
    sources = OrderedDict(
        (s, {"source": s}) for s in ["Improved", "Unimproved", "Surface water"]
    )
    dataframe = pandas.read_csv(path_to_dataset("sierra-leone/SL_subset2.csv"))
    summary = dataframe.groupby(["sdg_improved_source"]).size().to_dict()
    for key, val in summary.items():
        sources[key]["value"] = val

    return [v for v in sources.values()]


def get_waterpoint_distances_summary() -> List[Dict[str, Any]]:
    sources = OrderedDict(
        (s, {"distance": s})
        for s in ["Water on premises", "Less than 30 minutes", "More than 30 minutes"]
    )
    dataframe = pandas.read_csv(path_to_dataset("sierra-leone/SL_subset2.csv"))
    summary = dataframe.groupby(["sdg_round_trip"]).size().to_dict()
    for key, val in summary.items():
        sources[key]["value"] = val

    return [v for v in sources.values()]
