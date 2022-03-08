let XMLHttpRequest = require('xhr2');
const Station = require('../Model/Station.js')
const PublicTransport = require('../Model/PublicTransport.js')

const Http = new XMLHttpRequest();
const station = "Birmensdorf"
const url='https://transport.opendata.ch/v1/stationboard?station='+station+'"&limit=10';
Http.open("GET", url);
Http.send();


Http.onload = (e) => {
    let jsonObject = JSON.parse(Http.response);

    let station = new Station(jsonObject.station.name);
    let latestConnection = new PublicTransport(jsonObject.stationboard[0].name,jsonObject.stationboard[0].number,jsonObject.stationboard[0].stop.departure,jsonObject.stationboard[0].operator,jsonObject.stationboard[0].to,jsonObject.stationboard[0].category)
    console.log(station)
    console.log(latestConnection)
}

