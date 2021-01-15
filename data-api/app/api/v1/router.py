from fastapi import APIRouter

from app.api.v1 import mali, sierra_leone

router = APIRouter()

router.include_router(mali.router, prefix="/mali")
router.include_router(sierra_leone.router, prefix="/sierra-leone")
