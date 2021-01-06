import pytest
from starlette.testclient import TestClient

from app import main


@pytest.fixture
def client():
    with TestClient(main.app) as client:
        yield client
