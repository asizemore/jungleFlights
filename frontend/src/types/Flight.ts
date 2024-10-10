// Types

export type Flight = {
    destination_airport_iata: string,
    callsign: string,
    ground_speed: number,
    latitude: number,
    longitude: number,
    status?: string,
}