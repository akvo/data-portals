from fastapi import APIRouter

from app.api.v1 import mali

router = APIRouter()

router.include_router(mali.router, prefix="/mali")
