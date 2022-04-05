import React, { useEffect, useState } from 'react'
import $ from "jquery"

export default function Stationboard() {
    const axios = require('axios').default;
    const [requestParam,setRequestParam] = useState()
    useEffect(() => {

        axios.get('https://transport.opendata.ch/v1/locations',{
            params:{
                query: requestParam,
                type:"station"
            }
        })
           // .then(response => response.json())
            .then(data => console.log(data));

    }, [requestParam])



    return (

        <article>

            <div class="ui-widget station">
                <input class="input input-primary" id="station" onChange={e=>{setRequestParam(e.target.value)}} placeholder="Station" />
            </div>
            <div class="media">
            </div>

        </article>

    )
}
