var path = require('../data/sample_train_journey_path.json').path;


var getStationNameByBeaconUUID = function (UUID) {
    var stationName = null;

    path.map(function (station) {
        station.Beacons.map(function (beacon) {
            if (beacon.UUID == UUID) {
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
