import React, { useEffect, useState } from "react"
import { themeChange } from 'theme-change'
import Map from "./components/Map"
import Navbar from "./components/Navbar"
import Search from "./components/Search"
import Table from "./components/Table";

function Homepage() {
    let optionsForGeoLocation = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    const [nearestStation, setNearestStation] = useState([])
    const [currentLongitude, setLongitude] = useState(0)
    const [currentLatitude, setLatitude] = useState(0)
    const [stationboard, setStationboard] = useState([])
    const [currentPosition, setCurrentPosition] = useState([])
    const [stations, setStations] = useState('')
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
            {nearestStation.map((station) => {
                return (

                    <li onClick={() => {
                        getNextConnection(station.name)
                    }} key={station.id}><a>{station.name}</a></li>
                )

            })}
        </ul>
    )


    async function getNearestStation() {
        try {
            setStationboard([])
            const response = await axios.get(urlLocation);
            setNearestStation(response.data.stations)
            console.log(stations)

        } catch (error) {
            console.error(error);
        }
    }

    async function getNextConnection(station) {
        setNearestStation([])
        await axios.get('https://transport.opendata.ch/v1/locations', {
            params: {
                query: station,
                type: "station"
            }
        }).then(data => {
            setCurrentPosition(data.data.stations[0].coordinate)
        })
        try {
            const urlStationboard = 'https://transport.opendata.ch/v1/stationboard?station=' + station + '"&limit=10';
            const response = await axios.get(urlStationboard)
            setStationboard(response.data.stationboard)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

            <Navbar />
            <div className="flex justify-center mt-8 mb-8">
                <Search onSubmit={getNextConnection} />
                <p>OR</p>
                <button className="btn btn-primary mx-auto" onClick={() => {
                    getNearestStation()
                }}>Show nearest Connection
                </button>
            </div>
            {(nearestStation.length !== 0 && stationboard.length === 0) && (
                <div className="card w-1/2 mx-auto bg-base-100 shadow card-bordered">
                    <div className="card-body">
                        <h2 className="card-title">Stations</h2>
                        {menu}
                    </div>
                </div>)}

            {(nearestStation.length !== 0 && stationboard.length !== 0) && (
                <div className="grid grid-cols-2">
                    <div>
                        <div className="card w-100 mt-4 ml-4 mr-2 mb-4 h-auto bg-base-100 shadow card-bordered">
                            <div className="card-body">
                                <h2 className="card-title">Stations</h2>
                                {menu}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card w-100 mt-4 mr-4 ml-2 h-auto bg-base-100 shadow card-bordered">
                            <div className="card-body">
                                <Table stationboard={stationboard} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(nearestStation.length === 0 && stationboard.length !== 0) && (
                <div className="grid grid-cols-2">
                    <div>
                        <div className="card w-100 mt-4 ml-4 mr-2 mb-4 h-1/2 bg-base-100 shadow card-bordered">
                            <div className="card-body">
                                <h2 className="card-title">Departure Location</h2>
                                {(currentPosition.x & currentPosition.y) && <Map x={currentPosition.x} y={currentPosition.y} />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card w-100 mt-4 mr-4 ml-2 h-auto bg-base-100 shadow card-bordered">
                            <div className="card-body">
                                <Table stationboard={stationboard} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>

    )
}

export default Homepage