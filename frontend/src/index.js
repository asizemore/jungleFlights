import React from "react";
import { render } from 'react-dom';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import DepartingFlightStack from "./components/DepartingFlightStack";
import UpcomingDeparturesStack from "./components/UpcomingDeparturesStack";
import './styles/styles.css'; // Import the CSS file
import { Typography } from "@mui/material";


function App() {
  return (
    <div>
      <Box sx={{ display: 'flex', backgroundColor: '#fcfcfc'}}>
        <Stack spacing={2} sx={{ alignItems: 'center', justifyItems: 'center', width: '100%'}}>
          <AppBar position="static">
            <Typography variant="h5" sx={{padding: '10px', paddingLeft: '20px'}}>Jungle Noises</Typography>
          </AppBar>
          <Typography variant="h4" component='div' sx={{padding: '50px'}}>
            Currently departing
          </Typography>
          <DepartingFlightStack />
          <Typography variant="h4" component='div' sx={{padding: '50px'}}>
            Upcoming Departures
          </Typography>
          <UpcomingDeparturesStack />
        </Stack>
      </Box>
    </div>
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)