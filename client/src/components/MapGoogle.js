import React from 'react'; 
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'; 
import keys from './utils/key';

import '../styles/MapGoogle.css';

const MapGoogle = () => {

  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: keys.googleMapsApiKey, 
  })

  if(!isLoaded) return <div>Loading...</div>

  return (
    <Map />
  )
}

function Map(){
    const center = {lat: 10.294456898112978, lng: 123.88121366500856};

    return (
        <>
            <GoogleMap
                zoom={17} 
                center={center} 
                mapContainerClassName="map-container"       
            >
               
            <Marker position={center}/>
            </GoogleMap>
        </>
    )
        
}

export default MapGoogle