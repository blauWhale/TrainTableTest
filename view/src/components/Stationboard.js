import React, { useEffect, useState, useRef } from 'react'
import "../index.css"

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
        })
            // .then(response => response.json())
            .then(data => {
                console.log(data)
                setData(data)
            })

    }, [requestParam])

    function handleSubmit(station) {
        console.log(station)
        onSubmit(station)
    }

    return (
        <div class="form-control mx-auto">
            <label class="input-group">
                <article>
                    <div class="ui-widget station">
                        <input list="list" class="input input-primary" ref={inputRef} style={{ borderRadius: "0" }} id="station" onChange={e => { setRequestParam(e.target.value) }} placeholder="Station" />
                        <datalist id="list">
                            {data && data.data.stations.map((option) => {
                                return <option value={option.name} key={option.id} />
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
