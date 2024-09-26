import React from "react";
import { render } from 'react-dom';
import FlightDescriptions from "./components/FlightDescriptions"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jungle Flights
          </Typography>
        </Toolbar>
      </AppBar>
      <FlightDescriptions />
    </div>
    
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)