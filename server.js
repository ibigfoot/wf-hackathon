//'use strict'

//var beacon_location = require('./lib/beacon_location');
var train_journey = require('./lib/train_journey');
var beacon_mock = require('./lib/beacon_mock');
var journey = require('./data/journey.json').path;

var say = require('say');

var currentStationID = null;
//say.speak('Your train is approaching', 'Alex', 1.0);

currentStationID = journey[0].StationID;
startStation = journey[0];
destination = journey[journey.length-1];

/*beacon_location(function(event) {
    //console.log(event);
    var station = train_journey.getStationNameByBeaconUUID(event.uuid);
    if (station && station.id) {
        if (station.id != currentStationID) {
            var message = 'You are at '+ station.name +' station';

            console.log(message);
            say.speak(message, 'Alex', 1.0);
            currentStationID = station.id;
        }
    }    
});*/

var begun = false;
var ended = false;

beacon_mock(function(event) {
    var station = train_journey.getStationNameByBeaconUUID(event);
    console.log(station)
    var message = ""
    if (station && station.id) {
        if (station.id == startStation.StationID && !begun) {
            message = 'Begin your journey to '+destination.StationName;
            begun = true;
            say.speak(message, 'Alex', 1.0);
        }
        if (station.id != currentStationID && station.id != destination.StationID) {
            message = 'You are at '+ station.name +' station';
            say.speak(message, 'Alex', 1.0);
        }
        if (station.id == destination.StationID && !ended) {
            ended = true;
            message = "You have reached your destination "+destination.StationName+"."
            say.speak(message, 'Alex', 1.0);
        }
        console.log(message);
        
        currentStationID = station.id;        
    }    
});



//var keypress = require('keypress')
//
//keypress(process.stdin)
//
//var state = {
//    journey : [], // from TFL
//    currentStation : {},  // updated as we move through the journey
//    originStation : {
//        StationID:"9400ZZLUIMP",
//        StationName:"Imperial College",
//        Major:999,
//        InstancePrefix:"9999",
//        Latitude:51.498519,
//        Longitude:-0.177673,
//        WayfindrEnabled:true},
//    destinationStation : {
//        StationID:"9400ZZLUECT",
//        StationName:"Earls Court",
//        Major:63,
//        InstancePrefix:"003F",
//        Latitude:51.491876,
//        Longitude:-0.193526,
//        WayfindrEnabled:true}
//}
//// start journey
//// start beacon listener
////
//process.stdin.on('keypress', function (ch, key) {
//    console.log('got keypress ['+JSON.stringify(key)+']')
//    if (key && key.ctrl && key.name == 'c') {
//        process.stdin.pause();
//    }
//
//    //
//
//});
//
//process.stdin.setRawMode(true);
//process.stdin.resume();
