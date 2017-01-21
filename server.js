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

/*
    Event: Arriving on platform
    Action: Is this my train?
    Event: Your train is arriving
    Event: Leaving origin
    Action: How much further?
    Event: Disruption
    Event: One more stop
    Event: Arriving at destination
*/

beacon_mock(function(event) {
    var station = train_journey.getStationNameByBeaconUUID(event);
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
            say.speak(message, 'Alex', 1.0);
        }
        currentStationID = station.id;        
    }    
});

var continueFunc;
var furtherInfoFunc;

var keypress = require('keypress')
keypress(process.stdin)

process.stdin.on('keypress', function (ch, key) {
    console.log('got keypress ['+JSON.stringify(key)+']')
    if (key && key.ctrl && key.name == 'c') {
        process.exit();
    }
    //arriving on platform
    // ACTION - is this my train?
    // event arriving
    if (key && key.name == 'a') {
        eventArrivingAtPlatform();
    }
    // event - leaving origin
    if (key && key.name == 'l') {
        say.speak("You're leaving the platform ", 'Alex', 1.0);
    }
    if (key && key.name == 'n') {
        nextFunc();
    }
    // ACTION - how much further

    // event - distruption

    // event - one more stop

    // event - arriving at destination

});

process.stdin.setRawMode(true);
process.stdin.resume();

function actionHowMuchFurther() {
    
}


function eventArrivingAtPlatform() {
    say.speak("You're train is arriving. Would you like to hear the safety", 'Alex', 1.0);
    nextFunc = function() {

    }
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