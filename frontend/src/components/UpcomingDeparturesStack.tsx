import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { Flight } from "../types/Flight";



export default function UpcomingDeparturesStack() {

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
    

    // @ANN you're here. This repeats the api call seen in DepartingFlightStack. Gotta fix.

    return (
        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyItems: 'flex-start', width: '100%'}}>
            {flights_on_runway.length > 0
                ? flights_on_runway.map(flight => {
                    return (
                        <Card key={flight.callsign}>
                            <p>{flight.callsign}, destination {flight.destination_airport_iata}</p>
                        </Card>
                    )
                })
                : <Card>No flights prepping to depart</Card>
            }
        </Stack>
    )
}