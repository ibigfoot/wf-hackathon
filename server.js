//'use strict'

//var beacon_location = require('./lib/beacon_location');
var train_journey = require('./lib/train_journey');
var beacon_mock = require('./lib/beacon_mock');
var journey = require('./data/journey.json').path;
var beacons = require('./data/beacons.json');
var player = require('play-sound')(opts = {})

var say = require('say');

var currentStationID = null;
var stationIndex = 0;

/*beacon_location(function(event) {
    //console.log(event);
    var station = train_journey.getStationNameByBeaconUUID(event);
    if (station && station.id) {
        if (station.id != currentStationID) {
            var message = 'You are at '+ station.name +' station';

            console.log(message);
            say.speak(message, 'Alex', 1.0);
            currentStationID = station.id;
        }
    }    
});*/

currentStationID = "";
startStation = journey[0];
destination = journey[journey.length-1];

var continueFunc;
var furtherInfoFunc;

process.stdin.resume();
process.stdin.setEncoding('utf-8');

process.stdin.on('data', function(chunk) {

    console.log('got keypress ['+JSON.stringify(chunk)+']')

    // z is the next beacon
    if (chunk == "z\n" ) {
        var beacon = beacons[beaconIndex % (beacons.length-1)];
        mockEvent(beacon);
        beaconIndex++
    }
    //arriving on platform
    // ACTION - is this my train?
    // event arriving
    if (chunk == "a\n") {
        eventArrivingAtPlatform();
    }
    // event - leaving origin
    if (chunk == "l") {
        say.speak("You're leaving the platform ", 'Alex', 2.0);
    }
    if (chunk == "n") {
        nextFunc();
    }
    // ACTION - how much further
    if (chunk =='s\n') {
        actionHowMuchFurther();
    }

    // continue
    if (chunk == "c\n") {
        continueFunc();
    }
    // event - distruption

    // event - one more stop

    // event - arriving at destination


});

function mockEvent(mockEvent) {
    var station = train_journey.getStationNameByBeaconUUID(mockEvent);
    console.log(station)
    var message = ""
    if (station && station.id) {
        if (station.id == startStation.StationID && station.id != currentStationID) {
            message = 'Begin your journey to '+destination.StationName;
            begun = true;
        }
        if (station.id != currentStationID && station.id != destination.StationID) {
            message = 'You are at '+ station.name +' station';
        }
        if (station.id == destination.StationID && station.id != currentStationID) {
            ended = true;
            message = "You have reached your destination "+destination.StationName+"."   
        }
        if (message != "") {
            console.log(message);
            stationIndex++
            say.speak(message, 'Alex', 1.0);
        }
        currentStationID = station.id;        
    }    
}

var beaconIndex = 0;

function actionHowMuchFurther() {
    var stopsLeft = journey.length - (stationIndex + 1);
    var msg = ""
    if (stopsLeft == 1) {
        msg = "You are approaching your final stop, "+destination.StationName+". Prepare to leave the train.";
    } else {
        msg = "You are approaching "+journey[stationIndex+1].StationName+". There are "+stopsLeft+" until you reach "+destination.StationName;
    }
    say.speak(msg, 'Alex', 1.0);
    console.log(msg)
}


function eventArrivingAtPlatform() {
    player.play('./data/0564.wav', function(err) {
        if (err) {
            console.log(err)
        } else {
            continueFunc = function () {
                say.speak("You're train is arriving at "+destination.StationName+". Would you like to hear the safety information?", 'Alex', 1.0);
                continueFunc = function () {
                    say.speak("There is a curved platform at this station, be extra careful of the gap when leaving the train. The platform is a single platform and your nearest exit will be to the left. Today, it seems to be busier than usual at this station.", 'Alex', 1.0);
                }
            }
        }
    })
}

function eventLeavingOrigin() {
    say.speak("You're leaving the platform. Would you like to alert other users to changed conditions? ", 'Alex', 1.0);
}

function eventDisruption () {
    say.speak("There appears to be a disruption in your route. Would you like a different route? ", 'Alex', 1.0);  
}

function eventOneMoreStop () {
    say.speak("You are approaching STATION. The next stop after <STATION> is your stop: DESTINATION STATION. ? ", 'Alex', 1.0); 
}

function eventArrivingAtDestination() {
    say.speak("You are now arriving at DESTINATION_STATION. When you get off you'll have a wall in front of you and the exit will be to the right. ", 'Alex', 1.0); 
} 
