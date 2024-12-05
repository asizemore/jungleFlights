// Types

export type Flight = {
    destination_airport_iata: string,
    callsign: string,
    ground_speed: number,
    latitude: number,
    longitude: number,
    aircraft_code: string,
    status?: string,
    aircraft_code_display_name?: string,
}