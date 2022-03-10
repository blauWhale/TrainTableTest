import React, {useEffect, useState} from "react"
import {axios} from "axios";

function LocateMe() {
    let optionsForGeoLocation = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    const [nearestStation, setNearestStation] = useState([])
    const [currentLongitude, setLongitude] = useState(0)
    const [currentLatitude, setLatitude] = useState(0)
    const urlLocation = 'http://transport.opendata.ch/v1/locations?' +
        'x=' + currentLatitude +
        '&y=' + currentLongitude;

    useEffect(async ()=>{
        await navigator.geolocation.getCurrentPosition(success, error, optionsForGeoLocation);
    })
    async function success(pos) {
        let crd = pos.coords;
        setLongitude(crd.longitude)
        setLatitude(crd.latitude)
        console.log(currentLatitude + " " + currentLongitude)
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const axios = require('axios').default;






    // Want to use async/await? Add the `async` keyword to your outer function/method.
    async function getNearestStation() {
        try {
            console.log(urlLocation)
            const response = await axios.get(urlLocation);
            console.log(response.data.stations)
            setNearestStation(response.data.stations)

        } catch (error) {
            console.error(error);
        }
    }

    async function getNextConneticon(station) {
        try {
            const urlStationboard='https://transport.opendata.ch/v1/stationboard?station='+station+'"&limit=10';
            console.log(urlStationboard)
            const response = await axios.get(urlStationboard);
            console.log(response.data)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <button onClick={() => {
                getNearestStation()
            }}>Show me nearest Connection
            </button>
            <div>

            </div>
            {nearestStation && nearestStation.map((station) => {
                return(
                    <button onClick={() => {
                        getNextConneticon(station.name)
                    }} key={station.id}>{station.name}</button>
                )
            })}
        </>
    )
}

export default LocateMe