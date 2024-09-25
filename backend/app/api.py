from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time
from FlightRadar24 import FlightRadar24API



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
    departing_flights = [flight for flight in flights if (flight.destination_airport_iata != "LAX") and (flight.number)]
    
    return departing_flights

