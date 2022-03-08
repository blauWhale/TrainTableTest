<?php
// create curl resource
$ch = curl_init();
$station = preg_replace('#[ -]+#', '-',$_POST["station"]);

// set url
curl_setopt($ch, CURLOPT_URL, "https://transport.opendata.ch/v1/stationboard?station=".$station."&limit=10");

//return the transfer as a string
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

// $output contains the output string
$output = curl_exec($ch);

$decoded_json = json_decode($output, true);
echo "Next Connection <br>";
echo $decoded_json["stationboard"][0]["number"]." heading to ".$decoded_json["stationboard"][0]["to"]." leaving at " .date('H:i', strtotime($decoded_json["stationboard"][0]["stop"]["departure"])); ;


// close curl resource to free up system resources
curl_close($ch);