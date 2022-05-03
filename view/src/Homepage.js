import React, { useEffect, useState } from "react"
import moment from 'moment'
import { themeChange } from 'theme-change'
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
            const response = await axios.get(urlLocation);
            setNearestStation(response.data.stations)
            console.log(stations)

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

             <Navbar />
            <div className="flex justify-center mt-8 mb-8">
                <div class="form-control mx-auto">
                    <label class="input-group">
                    <Search setStation={setStations}/>
                        <button className="btn btn-primary mx-auto" onClick={() => {
                            setNearestStation(stations)
                        }}>
                            Search
                        </button>
                    </label>
                </div>
                <p>OR</p>
                <button className="btn btn-primary mx-auto" onClick={() => {
                    getNearestStation()
                }}>Show nearest Connection
                </button>
            </div>
            {(nearestStation.length !== 0 && stationboard.length === 0) && (
            <div class="card w-1/2 mx-auto bg-base-100 shadow card-bordered">
                <div class="card-body">
                    <h2 class="card-title">Stations</h2>
                    {menu}
                </div>
            </div>)}

            {(nearestStation.length !== 0 && stationboard.length !== 0) && (
                        <div class="grid grid-cols-2">
                        <div>
                            <div class="card w-100 mt-4 ml-4 mr-2 mb-4 h-auto bg-base-100 shadow card-bordered">
                                <div class="card-body">
                                    <h2 class="card-title">Stations</h2>
                                    {menu}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="card w-100 mt-4 mr-4 ml-2 h-auto bg-base-100 shadow card-bordered">
                                <div class="card-body">
                                    <Table stationboard={stationboard}/>
                                </div>
                            </div>
                        </div>
                    </div>
                        )}
            {(nearestStation.length === 0 && stationboard.length !== 0) && (
                <div class="grid grid-cols-1">
                    <div>
                        <div class="card w-100 mt-4 mr-4 ml-2 h-auto bg-base-100 shadow card-bordered">
                            <div class="card-body">
                                <Table stationboard={stationboard}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>

    )
}

export default Homepage