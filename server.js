//'use strict'

/*
    a - how much further?
    c - continue
    z - mock beacon event

    1 - Arrived at platform, ready to board the train
    2 - Train has left the station
    3 - There is a disruption to your journey
    4 - Arrived at the penultimate stop
    5 - Arrived at destination

    Demo (using Mock) ... all keypress events need to be followed with an enter

     Fire mock beacon (z) until first audio notification.
        - You have reached your platform.
        - There are 2 continuation messages available
    Fire another mock beacon (z)
    Press 2 
        - Leaving platform notification
    Fire another 2 mock beacons (z)
    Press 3
        - There is a service disruption
    Fire mock beacon until next audio
        - Penultimate station with follow on messages
    Fire mock until next audio  
        - you have arrived.

    END
*/

//var beacon_location = require('./lib/beacon_location');
var train_journey = require('./lib/train_journey');
var beacon_mock = require('./lib/beacon_mock');
//var journey = require('./data/journey.json').path;
var beacons = require('./data/beacons.json');
var player = require('play-sound')(opts = {})

var say = require('say');
var speachSpeed = 1.5
var speaker = 'Alex'

var continueFunc = function() {console.log("nothing to do")};

/*beacon_location(function(event) {
    //console.log(event);
    determineEvent(event); 
});*/


function determineEvent (event) {
    var station = train_journey.getStationNameByBeaconUUID(event);
    if (station && station.id) {
        console.log(station)
        if (train_journey.isChanged(station)) {
            console.log("Is changed : true");
            if (train_journey.isFirst(station.id)) {
                eventArrivingAtPlatform();
            }
            if (train_journey.isPenultimate(station.id)) {
                eventOneMoreStop();
            } 
            if (train_journey.isLast(station.id)) {
                eventArrivingAtDestination();
            }
        }
    } 
}


process.stdin.resume();
process.stdin.setEncoding('utf-8');

var beaconIndex = 0; //used for mocking 

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
    determineEvent(mockEvent); 
}
/*
    An action that is fired by user when they want to know how much further they have to go.
*/
function actionHowMuchFurther() {
    var stopsLeft = train_journey.stopsToDestination();
    say.speak("You have "+stopsLeft+" stops remaining. We estimate this should take approximately "+(stopsLeft*2)+" minutes", 
        speaker, 
        speachSpeed);
}

function eventArrivingAtPlatform() {
    f = function () {
        say.speak("You are now on platform 1. Your train to " + train_journey.getDestination().StationName + 
            " station will arrive in about 8mins. Two trains will arrive on this platform before your train. "+
            "We recommend you plan to enter at the front of the train, which is to your right. "+
            "Click to hear safety informationabout this platform.", 
            speaker, 
            speachSpeed);
        continueFunc = function () {
            say.speak("There are 2 warnings about this platform. "+
            "Warning 1: There is a big gap between the platform and the train. "+
            "Warning 2: There is a step. The floor of the train is above the level of the platform.", 
            speaker, 
            speachSpeed);
            continueFunc = function () {console.log("nothing to do");}
        }
    }
    playAlert(f);
}

function eventLeavingOrigin() {

    f = function () {
        say.speak("Looks like you're on your way. "+
                "Click if you would like to contribute safety information about the station you just left.", 
                speaker, 
                speachSpeed);
        continueFunc = function () {
                console.log('Nothing to do');
        }
    }
    playAlert(f);
}

function eventDisruption () {

    f = function () {
        say.speak("We have been notified of a disruption that may delay your arrival at "+train_journey.getDestination().StationName+
            ". The estimated delay is 17 minutes. Click to hear about a faster route.", 
            speaker, 
            speachSpeed);
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
            "Would you like some information about Old Street?", 
            speaker, 
            speachSpeed);
        continueFunc = function () {
            say.speak("There is a curved platform at this station, be extra careful of the gap when leaving the train. "+
                "The platform is a single platform and your nearest exit will be to the left. "+
                "Today, it seems to be busier than usual at this station.", 
                speaker, 
                speachSpeed);
            continueFunc = function () {console.log("nothing to do");}
        }
    }
    playAlert(f);
}

function eventArrivingAtDestination() {
    f = function() {
        say.speak("You are now arriving at "+train_journey.getDestination().StationName+
            ". When you get off you'll have a wall in front of you and the exit will be to the right. ", 
            speaker, 
            speachSpeed); 
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