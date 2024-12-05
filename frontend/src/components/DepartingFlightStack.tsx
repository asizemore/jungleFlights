import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Flight } from "../types/Flight";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

// Here is where the functions for grabbing the info go

export default function DepartingFlightStack() {

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
    

    return (
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center', justifyItems: 'flex-start'}}>
            <Paper sx={{padding: 2, width:'600px', height: '400px'}}>
                <h3> Plot but a really long title</h3>
            </Paper>
            <Paper sx={{padding: 2, height: '400px', paddingX: 5}}>
                {flights_taking_off.length > 0 ?
                    (
                        <Box sx={{paddingTop: 2}}>
                            <Typography variant='h4'> {flights_taking_off[0].callsign} </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}> Aircraft: {flights_taking_off[0].aircraft_code_display_name} </Typography>
                            <Typography variant='h6'> Destination: {flights_taking_off[0].destination_airport_iata} </Typography>
                            <Typography variant='h6'> Ground speed: {flights_taking_off[0].ground_speed} </Typography>
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