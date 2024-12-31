import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { Flight } from "../types/Flight";
import FlightCard from "./FlightCard";



export default function UpcomingDeparturesStack() {

    const [departing_flights, setFlights] = useState<Array<Flight>>([])
    const fetchFlights = async () => {
        const response = await fetch("http://localhost:8000/pdrflights")
        const departing_flights = await response.json()
        setFlights(departing_flights)
    }
    useEffect(() => {
        fetchFlights()

        // Set up an interval to fetch data at a regular interval
        const intervalId = setInterval(fetchFlights, 10000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run once on mount

    // Let's split up flights based on if they're just chilling on the runway or if they're taking off.
    const flights_on_runway = departing_flights.filter(flight => flight.ground_speed < 50);


      
    return (
        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyItems: 'flex-start', width: '90%'}}>
            {flights_on_runway.length > 0
                ? flights_on_runway.map((flight: Flight) => {
                    return <FlightCard flight={flight} />
                })
                : <Card>No flights prepping to depart</Card>
            }
        </Stack>
    )
}