import logging

from sqlalchemy import create_engine
from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed

from app.config import Settings

logger = logging.getLogger(__name__)
max_tries = 60 * 5  # 5 minutes
wait_seconds = 1
settings = Settings()


@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_seconds),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)
def check_db_awake() -> None:
    engine = create_engine(settings.DATABASE_URI, pool_pre_ping=True)
    try:
        with engine.connect() as conn:
            conn.execute("SELECT 1")
    except Exception as e:
        logger.error(e)
        raise (e)
    finally:
        engine.dispose()


if __name__ == "__main__":
    logger.info("Waiting for database service...")
    check_db_awake()
    logger.info("Database is ready!")
