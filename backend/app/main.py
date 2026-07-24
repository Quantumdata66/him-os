from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import github, weather, resume_builder

app = FastAPI(
    title="Project HIM OS Microservices API",
    description="Backend microservices providing GitHub commit tracking, weather sync, and resume generation.",
    version="2.0.0",
)

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Router modules
app.include_router(github.router, prefix="/api/v1/github", tags=["GitHub Automation"])
app.include_router(weather.router, prefix="/api/v1/weather", tags=["Weather Automation"])
app.include_router(resume_builder.router, prefix="/api/v1/resume", tags=["Resume Auto-Builder"])

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Project HIM OS Backend API",
        "version": "2.0.0",
        "docs_url": "/docs",
    }
