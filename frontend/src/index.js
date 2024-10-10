import React from "react";
import { render } from 'react-dom';
import FlightDescriptions from "./components/FlightDescriptions"
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import DepartingFlightStack from "./components/DepartingFlightStack";
import UpcomingDeparturesStack from "./components/UpcomingDeparturesStack";


function App() {
  return (
    <div>
      <Box sx={{ display: 'flex', backgroundColor: 'yellow'}}>
        <Stack spacing={2} sx={{ alignItems: 'center', justifyItems: 'center', width: '100%'}}>
          <AppBar position="static">
            <h2>Jungle Noises</h2>
          </AppBar>
          <DepartingFlightStack />
          {/* Next to depart stack */}
          <UpcomingDeparturesStack />
        </Stack>
      </Box>
    </div>
    
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)