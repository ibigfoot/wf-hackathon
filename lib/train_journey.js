//var path = require('../data/sample_train_journey_path.json').path;
var path = require('../data/journey.json').path;

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

//var getNextStation = function(stationID) {
//
//    for (var i = 0; i < path.length; i++) {
//
//    }
//}


    module.exports = {
    getStationNameByBeaconUUID: getStationNameByBeaconUUID
};
