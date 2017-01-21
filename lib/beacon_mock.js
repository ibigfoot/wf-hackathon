'use strict'
var beacons = require('../data/beacons.json');
var sleep = require('sleep');

module.exports = function(callback) {
    var i = 0;
    while (true) {
        sleep.sleep(3);
        var data = beacons[i % beacons.length];
        i++;
        data.UUID = data.UUID.trim()
        console.log("BeaconID : "+data.beaconID)
        callback(data);
    }
}