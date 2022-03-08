let XMLHttpRequest = require('xhr2');
const Station = require('../Model/Station.js')
const PublicTransport = require('../Model/PublicTransport.js')
const Train = require("../Model/Train");
const Bus = require("../Model/Bus");
const Tram = require("../Model/Tram");

const Http = new XMLHttpRequest();
const station = "Birmensdorf"
const url='https://transport.opendata.ch/v1/stationboard?station='+station+'&limit=10';
Http.open("GET", url);
Http.send();


Http.onload = (e) => {
    let jsonObject = JSON.parse(Http.response);

    let station = new Station(jsonObject.station.name);
    let latestConnection = new PublicTransport(jsonObject.stationboard[0].name,jsonObject.stationboard[0].number,jsonObject.stationboard[0].stop.departure,jsonObject.stationboard[0].operator,jsonObject.stationboard[0].to,jsonObject.stationboard[0].category)
    switch(latestConnection.category) {
        case 'S':
            let train = new Train(jsonObject.stationboard[0].stop.platform)
            train =  Object.assign(train,latestConnection)
            console.log(train)
            break;
        case 'B':
            let bus = new Bus();
            bus = Object.assign(bus,latestConnection)
            console.log(bus)
            break;
        case 'T':
            let tram = new Tram();
            tram = Object.assign(tram,latestConnection)
            console.log(tram)
            break;
        default:
        // code block
    }

    console.log(station)

}

