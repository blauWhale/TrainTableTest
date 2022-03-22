import React, { useEffect, useState } from "react"
import moment from 'moment'

function LocateMe() {
    let optionsForGeoLocation = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    const [nearestStation, setNearestStation] = useState([])
    const [currentLongitude, setLongitude] = useState(0)
    const [currentLatitude, setLatitude] = useState(0)
    const [stationboard, setStationboard] = useState([])
    const urlLocation = 'http://transport.opendata.ch/v1/locations?' +
        'x=' + currentLatitude +
        '&y=' + currentLongitude;

    useEffect(async () => {
        await navigator.geolocation.getCurrentPosition(success, error, optionsForGeoLocation);
    })

    async function success(pos) {
        let crd = pos.coords;
        setLongitude(crd.longitude)
        setLatitude(crd.latitude)
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const axios = require('axios').default;

    const menu = (
        <ul className="menu bg-base-100 w-56 p-2 rounded-box">
            {nearestStation.slice(1).map((station) => {
                return (

                    <li onClick={() => {
                        getNextConnection(station.name)
                    }} key={station.id}><a>{station.name}</a></li>
                )

            })}
        </ul>
    )

    const table = (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <p>{stationboard.name}</p>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Category</th>
                        <th>Line</th>
                        <th>Heading To</th>
                    </tr>
                </thead>
                <tbody>
                    {stationboard && stationboard.map((connection) => {
                        return (
                            <tr>
                                <td>{moment(connection.stop.departure).format('HH:mm')}</td>
                                <td>{connection.category} </td>
                                <td>{connection.number}</td>
                                <td>{connection.to}</td>
                            </tr>


                        )
                    })}
                </tbody>
            </table>
        </div>


    )


    // Want to use async/await? Add the `async` keyword to your outer function/method.
    async function getNearestStation() {
        try {
            const response = await axios.get(urlLocation);
            setNearestStation(response.data.stations)
            console.log(stationboard.length)

        } catch (error) {
            console.error(error);
        }
    }

    async function getNextConnection(station) {
        try {
            const urlStationboard = 'https://transport.opendata.ch/v1/stationboard?station=' + station + '"&limit=10';
            const response = await axios.get(urlStationboard);
            console.log(response.data)
            setStationboard(response.data.stationboard)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <button className="btn btn-primary mx-auto" onClick={() => {
                getNearestStation()
            }}>Show me nearest Connection
            </button>


            {nearestStation && menu}

            {!stationboard.length ? (<p> No results found!</p>) : table}

        </>
    )
}

export default LocateMe