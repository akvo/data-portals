import json
from os.path import dirname, join, realpath, isfile


def path_to_dataset(name: str) -> str:
    return realpath(join(dirname(__file__), "../datasets", name))


def tmp_file_cache(name, callback):
    filename = f"/tmp/{name}"
    if not isfile(filename):
        data = callback()
        with open(filename, "w") as f:
            json.dump(data, f)

    return filename
