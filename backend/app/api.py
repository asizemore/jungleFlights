from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time
import pandas as pd
from FlightRadar24 import FlightRadar24API
from pydantic import BaseModel
from typing import Any


# Convert aircraft code to display names
df = pd.read_csv('static/aircraft_code_conversion.csv')
aircraft_code_to_display_name = dict(zip(df['aircraft_code'], df['display_name']))

north_runway_bounds = "33.951072,33.9474,-118.434974,-118.3991"

class FlightModel(BaseModel):
    destination_airport_iata: str
    callsign: str
    ground_speed: float
    latitude: float
    longitude: float
    aircraft_code: str
    aircraft_code_display_name: str
    id: str
    # Add other attributes as needed

# For help, check out https://github.com/JeanExtreme002/FlightRadarAPI/blob/main/python/FlightRadar24/entities/flight.py#L7
def convert_flight_to_model(flight: Any) -> FlightModel:

    return FlightModel(
        destination_airport_iata=flight.destination_airport_iata,
        callsign=flight.callsign,
        ground_speed=flight.ground_speed,
        latitude=flight.latitude,
        longitude=flight.longitude,
        aircraft_code=flight.aircraft_code,
        aircraft_code_display_name=aircraft_code_to_display_name.get(flight.aircraft_code, 'Unknown Aircraft Code'),
        id=flight.id
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


# For a particular flight, get the details of that flight
@app.post("/flightonrunway", tags=["flightonrunway"])
async def get_flightonrunway(flight: FlightModel) -> dict:
    
        fr_api = FlightRadar24API()
        flight_details = fr_api.get_flight_details(flight)

        return flight_details


