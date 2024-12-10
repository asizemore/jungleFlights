// Types

export type Flight = {
    id: string,
    destination_airport_iata: string,
    callsign: string,
    ground_speed: number,
    latitude: number,
    longitude: number,
    aircraft_code: string,
    status?: string,
    aircraft_code_display_name?: string,
}


type AircraftModel = {
    code: string,
    text: string,
}

type Aircraft = {
    model: AircraftModel,
}

type Airline = {
    name: string,
    short: string,
}

type AirportDetails = {
    name: string,
}

type Airport = {
    destination: AirportDetails,
    origin: AirportDetails,
}

type TrailPoint = {
    lat: number,
    lng: number,
    alt: number,
    spd: number,
}

type FlightIdentification = {
    callsign: string,
    id: string,
}

export type FlightDetails = {
    aircraft: Aircraft,
    airline: Airline,
    airport: Airport,
    trail: Array<TrailPoint>,
    identification: FlightIdentification,
    // time
}

