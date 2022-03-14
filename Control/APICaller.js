let XMLHttpRequest = require('xhr2');
const Station = require('../Model/Station.js')
const PublicTransport = require('../Model/PublicTransport.js')


const Http = new XMLHttpRequest();
const station = "Birmensdorf"
const urlStationboard='https://transport.opendata.ch/v1/stationboard?station='+station+'"&limit=10';
let currentLongitude;
let currentLatitude;
const urlLocation='http://transport.opendata.ch/v1/locations?' +
    'x=' + currentLatitude +
    '&y='+ currentLongitude;
let optionsForGeoLocation = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
navigator.geolocation.getCurrentPosition(success, error, optionsForGeoLocation);


    let jsonObject

    Http.open("GET", urlLocation);
    Http.send();
    Http.onload = (e) => {

        jsonObject = JSON.parse(Http.response);
        console.log(jsonObject);
        // //Object Binding
        // let station = new Station(jsonObject.station.name,jsonObject.station.coordinate.x,jsonObject.station.coordinate.y);
        // let latestConnection = new PublicTransport(jsonObject.stationboard[0].name,jsonObject.stationboard[0].number,jsonObject.stationboard[0].stop.departure,jsonObject.stationboard[0].operator,jsonObject.stationboard[0].to,jsonObject.stationboard[0].category)
        // console.log(station)
        // console.log(latestConnection)
    }


    function success(pos) {
        let crd = pos.coords;
        currentLatitude = crd.latitude;
        currentLongitude = crd.longitude;
        console.log(crd.latitude)
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }