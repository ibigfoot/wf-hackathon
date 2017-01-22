//'use strict'

/*
    a - Action is how much further
    c - continue
    z - mock beacon event

    1 - Arrived at platform, ready to board the train
    2 - Train has left the station
    3 - There is a disruption to your journey
    4 - Arrived at the penultimate stop
    5 - Arrived at destination
*/

//var beacon_location = require('./lib/beacon_location');
var train_journey = require('./lib/train_journey');
var beacon_mock = require('./lib/beacon_mock');
var journey = require('./data/journey.json').path;
var beacons = require('./data/beacons.json');
var player = require('play-sound')(opts = {})

var say = require('say');

var speachSpeed = 1.5

var currentStationID = null;
var stationIndex = 0;

/*beacon_location(function(event) {
    //console.log(event);
    var station = train_journey.getStationNameByBeaconUUID(event);
    if (station && station.id) {
        if (station.id != currentStationID) {
            var message = 'You are at '+ station.name +' station';

            console.log(message);
            say.speak(message, 'Alex', speachSpeed);
            currentStationID = station.id;
        }
    }    
});*/


function determineEvent (event) {
    var station = train_journey.getStationNameByBeaconUUID(event);
}

currentStationID = "";
startStation = journey[0];
destination = journey[journey.length-1];

var continueFunc;
var furtherInfoFunc;

process.stdin.resume();
process.stdin.setEncoding('utf-8');

process.stdin.on('data', function(chunk) {

    /* --- z key to mock a beacon event */
    if (chunk == "z\n" ) {
        var beacon = beacons[beaconIndex % (beacons.length-1)];
        mockEvent(beacon);
        beaconIndex++
    }
    /* --- Actions ---- */
    if (chunk =='a\n') {
        actionHowMuchFurther();
    }
    // continue
    if (chunk == "c\n") {
        continueFunc();
    }
    /* ---- EVENTS ---- */
    if (chunk == "1\n") {
        eventArrivingAtPlatform();
    }
    // event - leaving origin
    if (chunk == "2\n") {
        eventLeavingOrigin();
    }

    // event - distruption
    if (chunk == "3\n") {
        eventDisruption();
    }
    // event - one more stop
    if (chunk == "4\n") {
        eventOneMoreStop();
    }
    // event - arriving at destination
    if (chunk == "5\n") {
        eventArrivingAtDestination();
    }
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
/*
    An action that is fired by user when they want to know how much further they have to go.
*/
function actionHowMuchFurther() {
    say.speak("You need to implement this", "Alex", speachSpeed)
}

function eventArrivingAtPlatform() {
    f = function () {
        say.speak("You are now on platform 1. Your train to " + destination.StationName + 
        " station will arrive in about 8mins. Two trains will arrive on this platform before your train. "+
        "We recommend you plan to enter at the front of the train, which is to your right. "+
        "Click to hear safety informationabout this platform.", "Alex", speachSpeed);
        continueFunc = function () {
            say.speak("There are 2 warnings about this platform. "+
            "Warning 1: There is a big gap between the platform and the train. "+
            "Warning 2: There is a step. The floor of the train is above the level of the platform.", 
            "Alex", speachSpeed);
        }
    }
    playAlert(f);
}

function eventLeavingOrigin() {

    f = function () {
        say.speak("Looks like you're on your way. "+
                "Click if you would like to contribute safety information about the station you just left.", "Alex", speachSpeed);
        continueFunc = function () {
                console.log('Nothing to do');
        }
    }
    playAlert(f);
}

function eventDisruption () {

    f = function () {
        say.speak("We have been notified of a disruption that may delay your arrival at "+destination.StationName+
        ". The estimated delay is 17 minutes. Click to hear about a faster route.", "Alex", speachSpeed);
        continueFunc = function() {
            console.log("Nothing to do here");
        }
    }
    playAlert(f);
}

function eventOneMoreStop () {
    f = function() {
        say.speak("You are approaching Moorgate station. "+
        "The next stop after Moorgate is your stop: Old Street Station. "+
        "Would you like some information about Old Street?", "Alex", speachSpeed);
        continueFunc = function () {
            say.speak("There is a curved platform at this station, be extra careful of the gap when leaving the train. "+
            "The platform is a single platform and your nearest exit will be to the left. "+
            "Today, it seems to be busier than usual at this station.", 'Alex', speachSpeed);
        }
    }
    playAlert(f);
}

function eventArrivingAtDestination() {
    f = function() {
        say.speak("You are now arriving at "+destination.StationName+
            ". When you get off you'll have a wall in front of you and the exit will be to the right. ", 
            'Alex', speachSpeed); 
        continueFunc = function() {
            console.log("Nothing to do");
        }
    }
    playAlert(f)
} 

function playAlert(nf) {
    player.play('./data/0564.wav', function() {
        continueFunc = nf;
    });
}