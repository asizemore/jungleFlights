import React from "react";
import { render } from 'react-dom';
import FlightDescriptions from "./components/FlightDescriptions"

function App() {
  return (
    // <Button>Hello tyler</Button>
    <FlightDescriptions />
    
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)