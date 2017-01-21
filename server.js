//'use strict'

var beacon_location = require('./lib/beacon_location');
var train_journey = require('./lib/train_journey');

var say = require('say');

var currentStationID = null;

//say.speak('Your train is approaching', 'Alex', 1.0);

beacon_location(function(event) {
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
