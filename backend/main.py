from fastapi import FastAPI

app = FastAPI(
    title="Agriculture Agent",
    description="Multi-Agent Crop Recommendation System",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "project": "Agriculture Agent",
        "status": "Running",
        "message": "Welcome to Agriculture Multi-Agent System 🚜"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }