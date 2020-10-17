from os.path import dirname, join, realpath


def path_to_dataset(name: str) -> str:
    return realpath(join(dirname(__file__), "../datasets", name))
