import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { Flight } from "../types/Flight";
import Typography from '@mui/material/Typography';



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

    const cardContent = function(flight: Flight) {
        return (
            <React.Fragment>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {flight.callsign}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{flight.aircraft_code}</Typography>
                    <Typography variant="body2">
                    Destination: {flight.destination_airport_iata}
                    </Typography>
                </CardContent>
            </React.Fragment>
        )
    };
      






    // @ANN you're here. This repeats the api call seen in DepartingFlightStack. Gotta fix.
    // I also added aircraft_code_conversion.csv. Reading that in should also go in the bigger component.
    // 'Spose could do it here just to see if it works but really i need to add a wrapping component.

    return (
        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyItems: 'flex-start', width: '100%'}}>
            {flights_on_runway.length > 0
                ? flights_on_runway.map(flight => {
                    return (
                        <Card key={flight.callsign} style={{width:'300px', padding:'10px'}}>
                            {cardContent(flight)}
                        </Card>
                    )
                })
                : <Card>No flights prepping to depart</Card>
            }
        </Stack>
    )
}