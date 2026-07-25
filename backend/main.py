from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Agriculture Agent",
    description="Multi-Agent Crop Recommendation System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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


@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    filename = (file.filename or "image").lower()
    content_type = file.content_type or "image/jpeg"

    if "leaf" in filename or "plant" in filename:
        image_type = "Leaf / Plant"
        status = "Healthy crop condition"
        recommendation = "Maintain moisture and apply balanced nutrients"
        confidence = 0.92
        recommendations = [
            {"icon": "fas fa-tint", "title": "Irrigation plan", "detail": "Water early in the morning and avoid overwatering."},
            {"icon": "fas fa-leaf", "title": "Nutrient support", "detail": "Add compost or organic fertilizer for stronger growth."},
        ]
    elif "soil" in filename:
        image_type = "Soil"
        status = "Soil looks fertile"
        recommendation = "Add organic material to sustain nutrient balance"
        confidence = 0.88
        recommendations = [
            {"icon": "fas fa-mountain", "title": "Soil care", "detail": "Loosen the soil and add compost to improve structure."},
            {"icon": "fas fa-seedling", "title": "Crop fit", "detail": "This soil profile suits vegetables and cereals well."},
        ]
    elif "pest" in filename or "bug" in filename:
        image_type = "Pest / Disease"
        status = "Potential pest risk"
        recommendation = "Inspect the affected area and treat early"
        confidence = 0.9
        recommendations = [
            {"icon": "fas fa-bug", "title": "Pest response", "detail": "Use safe crop protection methods and isolate affected plants."},
            {"icon": "fas fa-shield-alt", "title": "Monitor", "detail": "Check the area again after 48 hours for further spread."},
        ]
    else:
        image_type = "Crop"
        status = "Good growth trend"
        recommendation = "Keep monitoring and apply preventive care"
        confidence = 0.86
        recommendations = [
            {"icon": "fas fa-sun", "title": "Sun exposure", "detail": "Ensure the crop gets enough light during the day."},
            {"icon": "fas fa-chart-line", "title": "Growth tracking", "detail": "Compare weekly progress to adjust fertilizer use."},
        ]

    return {
        "imageType": image_type,
        "confidence": confidence,
        "status": status,
        "recommendation": recommendation,
        "weather": {
            "temperature": 30,
            "status": "Sunny"
        },
        "recommendations": recommendations,
        "filename": file.filename,
        "contentType": content_type,
    }