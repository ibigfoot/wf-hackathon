//var path = require('../data/sample_train_journey_path.json').path;
var path = require('../data/journey.json').path;

var getStationNameByBeaconUUID = function (foundBeacon) {
    var stationName = null;

    path.map(function (station) {
        
        station.Beacons.map(function (beacon) {
            
            if (beacon.UUID.trim() == foundBeacon.UUID && 
                        beacon.Major == foundBeacon.Major && 
                        beacon.Minor == foundBeacon.Minor) {
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
