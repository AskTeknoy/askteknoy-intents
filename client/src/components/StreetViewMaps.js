import React, { useState, useEffect }from 'react'
import ReactStreetview from "react-streetview";
import { Client } from "@googlemaps/google-maps-services-js";

import keys from './utils/key';

import '../styles/MapGoogle.css';

const MapGoogleSteetView = () => {  

  // school coordinates
  const [positions, setPositions] = useState({
    lat: 10.2942433, 
    lng: 123.8815543
  })

  // street view data options
  const streetViewPanoramaOptions = {
    position: { lat: positions.lat, lng: positions.lng },
    pov: { heading: -70, pitch: 20 },
    zoom: 1,
    addressControl: true,
    showRoadLabels: true,
    zoomControl: true
  };

  // render client google maps api
  useEffect(() => {
    const client = new Client({});
  })

  // render street view
  return (
    <div className='street-view-container'>
        <ReactStreetview
            apiKey={keys.googleMapsApiKey}
            streetViewPanoramaOptions={streetViewPanoramaOptions}
        />
    </div>
  )
}

export default MapGoogleSteetView