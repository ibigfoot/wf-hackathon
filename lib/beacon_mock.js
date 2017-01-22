'use strict'
var beacons = require('../data/beacons.json');
var sleep = require('sleep');

module.exports = function(callback) {
    var i = 0;
    console.log("storing...")
    var time = 0;

    while (true) {
        if (time % 3000000) {
            var data = beacons[i % beacons.length];
            i++;
            data.UUID = data.UUID.trim()
            console.log("BeaconID : "+data.beaconID)
            callback(data);
        }
        time++;
    }
}