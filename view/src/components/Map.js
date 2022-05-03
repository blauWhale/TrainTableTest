import React ,{useEffect}from 'react'
import { MapContainer, TileLayer, useMap, Popup,Marker } from 'react-leaflet'
import "../index.css"

export default function Map({x,y}) {
    const position = [x, y]

    
    return(
      <MapContainer center={position} zoom={20} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            You are here!
          </Popup>
        </Marker>
      </MapContainer>
    )
}
