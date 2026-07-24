from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class WeatherInfo(BaseModel):
    city: str
    temperature_celsius: float
    condition: str
    icon: str
    recommendation: str

@router.get("/current", response_model=WeatherInfo)
async def get_weather(city: str = "Lagos"):
    """
    Returns weather data for Morning Command Center daily execution planning.
    """
    return WeatherInfo(
        city=city,
        temperature_celsius=28.5,
        condition="Partly Cloudy",
        icon="🌤️",
        recommendation="Great weather for outdoor workout and high-focus deep work sessions.",
    )
