import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Flight, FlightDetails } from "../types/Flight";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

// Here is where the functions for grabbing the info go

export default function DepartingFlightStack() {

    // departing_flights might not be needed...
    const [departing_flights, setFlights] = useState<Array<Flight>>([]) 
    const [flight_on_runway, setFlightOnRunway] = useState<FlightDetails | null>(null);

    const fetchFlights = async () => {
        const response = await fetch("http://localhost:8000/pdrflights")
        const departing_flights = await response.json()
        setFlights(departing_flights)
    }

    // Fetch a specific flight with /flightonrunway
    const fetchFlightOnRunway = async(flight_taking_off_id: string) => {
        for (let i = 0; i < 20; i++) {
            console.log(i);
            console.log(departing_flights.filter(flight => flight.id === flight_taking_off_id));

            const response = await fetch("http://localhost:8000/flightonrunway", {
                method: 'POST', // Change to POST method
                headers: {
                    'Content-Type': 'application/json', // Add headers
                },
                body: JSON.stringify(departing_flights.filter(flight => flight.id === flight_taking_off_id)[0]) // Add body data as needed
            });
            const flight_on_runway = await response.json();
            console.log(flight_on_runway);
            setFlightOnRunway(flight_on_runway);

            // Wait for 2 seconds before fetching again
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        // Clear state
        setFlightOnRunway(null);
    }


    useEffect(() => {
        fetchFlights()

        // Set up an interval to fetch data every second
        const intervalId = setInterval(fetchFlights, 3000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run once on mount


    // Let's split up flights based on if they're just chilling on the runway or if they're taking off.
    const flights_taking_off = departing_flights.filter(flight => flight.ground_speed >= 50);
    const flight_taking_off_id = flights_taking_off.length > 0 ? flights_taking_off[0].id : null;
    useEffect(() => {
        if (flight_taking_off_id) {
            fetchFlightOnRunway(flight_taking_off_id);
        }
    }, [flight_taking_off_id]); // Dependency array to run when flights_taking_off changes

    

    return (
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center', justifyItems: 'flex-start'}}>
            <Paper sx={{padding: 2, width:'600px', height: '400px'}}>
                <h3> Plot but a really long title</h3>
            </Paper>
            <Paper sx={{padding: 2, height: '400px', paddingX: 5}}>
                {flight_on_runway ?
                    (
                        <Box sx={{paddingTop: 2}}>
                            <Typography variant='h4'> {flight_on_runway.identification.callsign} </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}> Aircraft: {flight_on_runway.aircraft.model.text} </Typography>
                            <Typography variant='h6'> Destination: {flight_on_runway.airport.destination.name} </Typography>
                            <Typography variant='h6'> Ground speed: {flight_on_runway.trail[0].spd} kts</Typography>
                        </Box>
                    )
                    : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <Typography variant='h5'> No flights taking off </Typography>
                        </Box>
                    )
                }
            </Paper>
        </Stack>
    )
}