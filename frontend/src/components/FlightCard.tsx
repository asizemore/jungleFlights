import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";
import { Flight } from "../types/Flight";

export type FlightCardProps = {
    flight: Flight
}

export default function FlightCard({flight}: FlightCardProps) {
    return (
        <Card key={flight.callsign} style={{width:'300px', padding:'10px', height:'140px'}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {flight.callsign}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{flight.aircraft_code_display_name}</Typography>
                <Typography variant="body2">
                Destination: {flight.destination_airport_iata}
                </Typography>
            </CardContent>
        </Card>
    )
}
