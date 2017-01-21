var path = require('../data/sample_train_journey_path.json').path;


var getStationNameByBeaconUUID = function(UUID) {
    var stationName = null;

    path.map(function(station){
        station.Beacons.map(function(beacon) {
            if (beacon.UUID == UUID) {
                stationName  = station.StationName;
            }
        })
    });

    return stationName;
};


module.exports = {
    getStationNameByBeaconUUID: getStationNameByBeaconUUID
};
