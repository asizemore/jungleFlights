from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time
from FlightRadar24 import FlightRadar24API
from pydantic import BaseModel
from typing import Any



todos = [
    {
        "id": "1",
        "item": "Read a book."
    },
    {
        "id": "2",
        "item": "Cycle around town."
    }
]

north_runway_bounds = "33.951072,33.9474,-118.434974,-118.3991"

class FlightModel(BaseModel):
    destination_airport_iata: str
    callsign: str
    ground_speed: float
    latitude: float
    longitude: float
    # Add other attributes as needed

def convert_flight_to_model(flight: Any) -> FlightModel:
    return FlightModel(
        destination_airport_iata=flight.destination_airport_iata,
        callsign=flight.callsign,
        ground_speed=flight.ground_speed,
        latitude=flight.latitude,
        longitude=flight.longitude,
    )

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.get("/todo", tags=["todos"])
async def get_todos() -> dict:
    return { "data": todos }

@app.get("/pdrflights", tags=["pdrflights"])
async def get_pdrflights() -> list:

    fr_api = FlightRadar24API()
    flights = fr_api.get_flights(bounds = north_runway_bounds) # List of Flights

    # We only care about flights leaving LAX
    departing_flights = [convert_flight_to_model(flight) for flight in flights if (flight.destination_airport_iata != "LAX") and (flight.number)]
    
    # Serialize departing_flights


    return departing_flights

