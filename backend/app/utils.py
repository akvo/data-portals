import json
from os.path import dirname, isfile, join, realpath
from typing import Any, Callable, Dict, List, Union


def path_to_dataset(name: str) -> str:
    return realpath(join(dirname(__file__), "../datasets", name))


def tmp_file_cache(
    name: str,
    callback: Callable[[], Union[Dict[str, Any], List[Any]]],
    fresh: bool = False,
) -> str:
    filename = f"/tmp/{name}"
    if not isfile(filename) or fresh:
        data = callback()
        with open(filename, "w") as f:
            json.dump(data, f)

    return filename
