from functools import lru_cache
from typing import Any, Iterator, Optional

from fastapi import Depends, FastAPI
from fastapi.middleware.gzip import GZipMiddleware
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session, sessionmaker

from app.api.v1.router import router
from app.config import Settings

app = FastAPI()
app.add_middleware(GZipMiddleware, minimum_size=1000)

_db_engine: Optional[Engine]


@lru_cache
def get_settings() -> Settings:
    return Settings()


@app.on_event("startup")
def create_database_engine_pools() -> None:
    global _db_engine
    settings = get_settings()
    _db_engine = create_engine(settings.DATABASE_URI, pool_pre_ping=True)


@app.on_event("shutdown")
def dispose_database_engine_pools() -> None:
    global _db_engine
    if _db_engine:  # pragma: no cover
        _db_engine.dispose()


async def get_database_engine() -> Engine:
    assert _db_engine is not None
    return _db_engine


def get_database_session(
    engine: Engine = Depends(get_database_engine),
) -> Iterator[Session]:
    factory = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = factory()
    try:
        yield db
    finally:
        db.close()


@app.get("/ping", include_in_schema=False)
async def ping(session: Session = Depends(get_database_session)) -> Any:
    result = session.execute("SELECT 1")
    return {"ping": "pong!", "db": True if result else False}


app.include_router(router, prefix="/api/v1")
