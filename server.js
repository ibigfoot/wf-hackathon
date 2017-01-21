'use strict'

var keypress = require('keypress')

keypress(process.stdin)

var state = {
    journey : [], // from TFL
    currentStation : {},  // updated as we move through the journey
    originStation : {
        StationID:"9400ZZLUIMP",
        StationName:"Imperial College",
        Major:999,
        InstancePrefix:"9999",
        Latitude:51.498519,
        Longitude:-0.177673,
        WayfindrEnabled:true},
    destinationStation : {
        StationID:"9400ZZLUECT",
        StationName:"Earls Court",
        Major:63,
        InstancePrefix:"003F",
        Latitude:51.491876,
        Longitude:-0.193526,
        WayfindrEnabled:true}
}
// start journey
// start beacon listener
// 
process.stdin.on('keypress', function (ch, key) {
    console.log('got keypress ['+JSON.stringify(key)+']')
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }

    //     

});

process.stdin.setRawMode(true);
process.stdin.resume();
