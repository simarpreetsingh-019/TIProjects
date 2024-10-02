from fastapi import FastAPI
from starlette.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from auth.api import auth_router
from blockchain.api import bchain_router
from unmask.api import unmask_router
from uploads.api import upload_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router, prefix="/api")
app.include_router(bchain_router, prefix="/api")
app.include_router(upload_router, prefix="/api")
app.include_router(unmask_router, prefix="/api")

app.mount("/api/dwd", StaticFiles(directory="assets"), name="download")
app.mount("/certificate", StaticFiles(directory="certificates"), name="certificates")

uvicorn.run(app, host="localhost", port=8000)
