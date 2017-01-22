//var path = require('../data/sample_train_journey_path.json').path;
var path = require('../data/journey2.json').path;

var currentStation;

var getStationNameByBeaconUUID = function (foundBeacon) {
    var stationName = null;

    path.map(function (station) {
        
        station.Beacons.map(function (beacon) {
            var mapped = beacon.UUID.trim() + beacon.Major + beacon.Minor;
            var found = foundBeacon.UUID.trim() + foundBeacon.Major + foundBeacon.Minor;
            //console.log("["+mapped+"] == ["+found+"]")
            if (mapped == found) {
                stationName = {
                    id: station.StationID,
                    name: station.StationName
                };
            }
        })
    });

    return stationName;
};

var isFirst = function(StationID) {
    if (path[0].StationID == StationID) return true;
    return false;
}

var isPenultimate = function(StationID) {
    if (path[path.length-2].StationID == StationID) return true;
    return false;
}

var isLast = function(StationID) {
    if (path[path.length-1].StationID == StationID) return true;
    return false;
}
var getJourney = function(i) {
    if( i < path.length) return path[i]
    return false
}

var getOrigin = function() {
    return path[0];
}
var getDestination = function() {
    return path[path.length-1];
}

var isChanged = function(station) {
    console.log(station)
    if (currentStation == null) {
        currentStation = station;
        return true;
    } else if (currentStation.id != station.id) {
        console.log("["+currentStation.id +"] != ["+station.id+"]")
        currentStation = station;
        return true;
    } else {
        return false;
    }
} 

var getCurrentStation = function() {
    return currentStation;
}

var stopsToDestination = function() {
    for (var i = 0; i < path.length; i++) {
        if (path[i].StationID == currentStation.id) return path.length - (i +1);
    }
    return 0;
}

//var getNextStation = function(stationID) {
//
//    for (var i = 0; i < path.length; i++) {
//
//    }
//}


    module.exports = {
    getStationNameByBeaconUUID: getStationNameByBeaconUUID,
        isFirst: isFirst,
        isLast: isLast,
        stopsToDestination: stopsToDestination,
        getJourney: getJourney,
        getOrigin: getOrigin,
        getDestination: getDestination,
        getCurrentStation: getCurrentStation,
        isChanged: isChanged,
        isPenultimate: isPenultimate
};
