import React, { useEffect, useState } from "react";

type Flight = {
    destination_airport_iata: string,
    callsign: string,
    ground_speed: number,
    latitude: number,
    longitude: number,
    status?: string,
}

// const FlightDescriptionsContext = React.createContext({
//     departing_flights: [], fetchFlights: () => {}
//   })

export default function FlightDescriptions() {
    const [departing_flights, setFlights] = useState<Array<Flight>>([])
    const fetchFlights = async () => {
        const response = await fetch("http://localhost:8000/pdrflights")
        const departing_flights = await response.json()
        setFlights(departing_flights)
    }
    useEffect(() => {
        fetchFlights()

        // Set up an interval to fetch data every second
        const intervalId = setInterval(fetchFlights, 1000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run once on mount


    // Let's split up flights based on if they're just chilling on the runway or if they're taking off.
    const flights_on_runway = departing_flights.filter(flight => flight.ground_speed < 50);
    const flights_taking_off = departing_flights.filter(flight => flight.ground_speed >= 50);
    
    // Can add the part where they fly over pdr with a different bounding box and altitude filters.
    // Could do all of it with one request really, then use location and altiutde.

    return (
        // <FlightDescriptionsContext.Provider value={{departing_flights, fetchFlights}}>
        <>
            <p>{'Flights on the north runway'}</p>
            {flights_on_runway.map(flight => {
                return (
                    <p>{flight.callsign}, destination {flight.destination_airport_iata}</p>
                )
            })}
            <br></br>
            <p>{'Taking off:'}</p>
            {flights_taking_off.map(flight => {
                return (
                    <p>{flight.callsign}, destination {flight.destination_airport_iata}, speed {flight.ground_speed}</p>
                )
            })}
        </>
        // </FlightDescriptionsContext.Provider>
    )
}