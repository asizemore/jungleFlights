import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Flight, FlightDetails } from "../types/Flight";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AltitudePlot from "./AltitudePlot";
import GroundSpeedPlot from "./GroundSpeedPlot";


type AltitudeData = {
    x: number,
    y: number
}

type GroundSpeedData = {
    x: number,
    y: number
}


export default function DepartingFlightStack() {

    // departing_flights might not be needed...
    const [departing_flights, setFlights] = useState<Array<Flight>>([]) 
    const [flight_on_runway, setFlightOnRunway] = useState<FlightDetails | null>(null);
    const [altitudeData, setAltitudeData] = useState<AltitudeData[]>([]);
    const [groundSpeedData, setGroundSpeedData] = useState<{ x: number, y: number }[]>([]);

    const fetchFlights = async () => {
        const response = await fetch("http://localhost:8000/pdrflights")
        const departing_flights = await response.json()
        setFlights(departing_flights)
    }


    // Fetch a specific flight with /flightonrunway
    const fetchFlightOnRunway = async (flight_taking_off_id: string) => {

        for (let i = 0; i < 20; i++) {
            const response = await fetch("http://localhost:8000/flightonrunway", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(departing_flights.filter(flight => flight.id === flight_taking_off_id)[0])
            });
            const flight_on_runway = await response.json();

            setFlightOnRunway(flight_on_runway);

            // Update the altitude data
            // Use a functional update to ensure we're updating the previous state.
            setAltitudeData((prevAltitudeData: AltitudeData[]) => {
                const newAltitude: number = +flight_on_runway.trail[0].alt;
                const newAltitudeData = [...prevAltitudeData, { x: i, y: newAltitude }];
                return newAltitudeData;
            });

            setGroundSpeedData((prevGroundSpeedData: GroundSpeedData[]) => {
                const newGroundSpeed: number = +flight_on_runway.trail[0].spd;
                const newGroundSpeedData = [...prevGroundSpeedData, { x: i, y: newGroundSpeed }];
                return newGroundSpeedData;
            });



            // Wait for 3 seconds before fetching again
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        // Clear state
        setFlightOnRunway(null);
        setAltitudeData([]);
        setGroundSpeedData([]);
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


    console.log("plot's altitude data", altitudeData);
    return (
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center', justifyItems: 'flex-start'}}>
            <Paper sx={{padding: 2, width:'600px', height: '400px'}}>
                {altitudeData.length > 0 ? <AltitudePlot data={altitudeData} /> : <p>No data</p>}
                {groundSpeedData.length > 0 ? <GroundSpeedPlot data={groundSpeedData} /> : <p>No data</p>}
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