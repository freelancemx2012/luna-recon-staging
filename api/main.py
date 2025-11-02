import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Luna Recon API (staging)")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
API_KEY = os.environ.get("API_KEY", "")

@app.middleware("http")
async def require_api_key(request: Request, call_next):
    if API_KEY:
        key = request.headers.get("x-api-key", "")
        if key != API_KEY:
            raise HTTPException(status_code=401, detail="Unauthorized")
    return await call_next(request)

@app.get("/healthz")
async def healthz():
    return {"ok": True}

@app.get("/whois")
async def whois_lookup(domain: str):
    return {"domain": domain, "whois": "stub"}