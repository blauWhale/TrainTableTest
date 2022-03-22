import React, {useEffect, useState} from "react"
import axios from "axios";
import moment from 'moment';
import {Button, Center, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'

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
            <Center>
            <Button colorScheme='purple' onClick={() => {
                getNearestStation()
            }}>Show me nearest Connection
            </Button>
            </Center>

            <Stack spacing={30} direction='row' align='center' marginTop={10}>
                {nearestStation && nearestStation.slice(1).map((station) => {
                    return (
                        <Button colorScheme='cyan' onClick={() => {
                            getNextConnection(station.name)
                        }} key={station.id}>{station.name}</Button>

                    )

                })}
            </Stack>
            {!stationboard.length ? (
               <p></p>):
                        ( <Table variant='simple'>
                            <TableCaption>{stationboard.name}</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Time</Th>
                                    <Th>Category</Th>
                                    <Th>Line</Th>
                                    <Th>Heading To</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {stationboard && stationboard.map((connection) => {
                                    return (
                                        <Tr>
                                            <Td>{moment(connection.stop.departure).format('HH:mm')}</Td>
                                            <Td>{connection.category} </Td>
                                            <Td>{connection.number}</Td>
                                            <Td>{connection.to}</Td>
                                        </Tr>


                                    )
                                })}
                            </Tbody>
                        </Table>)}

            </>
                )
            }

            export default LocateMe