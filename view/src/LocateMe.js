import React, { useEffect, useState } from "react"
import moment from 'moment'
import { themeChange } from 'theme-change'

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
    }, [])

    useEffect(() => {
        themeChange(false)
    }, [])

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
                                <td>{(() => {
                                    switch (connection.category) {
                                        case "T":
                                            return <span class="material-icons">
                                                tram
                                            </span>
                                        case "B":
                                            return <span class="material-icons">
                                            directions_bus
                                            </span>
                                        default:
                                            return 'error'
                                    }
                                })()}</td>
                                <td>{connection.number}</td>
                                <td>{connection.to}</td>
                            </tr>


                        )
                    })}
                </tbody>
            </table>
        </div>


    )
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
        <><div class="navbar bg-base-100">
            <div class="navbar-start">
                <div class="dropdown">
                    <label tabIndex="0" class="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>
            </div>
            <div class="navbar-center">
                <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div class="navbar-end">
                <button class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <button class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span class="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
            </div>
        </div>
            <div class="grid grid-cols-2">
                <div>
                    <div class="card w-100 mt-4 ml-4 mr-2 h-auto bg-base-100 shadow-xl card-bordered">
                        <div class="card-body">
                            <h2 class="card-title">Options</h2>
                            <button className="btn btn-primary mx-auto" onClick={() => {
                                getNearestStation()
                            }}>Show me nearest Connection
                            </button>
                            <span class="material-icons">
                                tram
                            </span>
                            <select data-choose-theme className="select select-primary mx-auto max-w-xs">
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                                <option value="cupcake">Cupcake</option>
                                <option value="bumblebee">Bumblebee</option>
                                <option value="winter">Winter</option>
                                <option value="night">Night</option>
                                <option value="coffee">Coffee</option>
                                <option value="cyberpunk">Cyberpunk</option>
                                <option value="wireframe">Wireframe</option>
                                <option value="aqua">Aqua</option>
                            </select>
                        </div>

                    </div>
                    <div class="card w-100 mt-4 ml-4 mr-2 h-auto bg-base-100 shadow-xl card-bordered">
                        <div class="card-body">
                            <h2 class="card-title">Options</h2>
                            {nearestStation && menu}
                        </div>
                    </div>
                </div>

                <div>

                    <div class="card w-100 mt-4 mr-4 ml-2 h-auto bg-base-100 shadow-xl card-bordered">
                        <div class="card-body">

                            {stationboard.length && table}
                        </div>
                    </div>

                </div>
            </div></>

    )
}

export default LocateMe