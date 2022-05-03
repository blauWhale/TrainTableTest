import React, { useEffect, useState, useRef } from 'react'
import "../index.css"
import Map from './Map'

export default function Stationboard({ onSubmit }) {
    const axios = require('axios').default;
    const [requestParam, setRequestParam] = useState()
    const [data, setData] = useState()
    const inputRef = useRef();
    useEffect(() => {

        axios.get('https://transport.opendata.ch/v1/locations', {
            params: {
                query: requestParam,
                type: "station"
            }
        }).then(data => {
                setData(data)
            })

    }, [requestParam])

    function handleSubmit(station) {
        onSubmit(station)
    }

    return (
        <div className="form-control mx-auto">
            <label className="input-group">
                <article>
                    <div className="ui-widget station">
                        <input list="list" className="input input-primary rounded" ref={inputRef} style={{ borderRadius: "10px 0 0 10px" }} id="station" onChange={e => { setRequestParam(e.target.value) }} placeholder="Station" />
                        <datalist id="list">
                            {data && data.data.stations.map((option) => {
                                return <option value={option.name} key={option.name} />
                            })}
                        </datalist>
                    </div>
                </article>
                <button className="btn btn-primary mx-auto" onClick={()=>handleSubmit(inputRef.current.value)}>
                    Search
                </button>
            </label>
        </div>
    )
}
