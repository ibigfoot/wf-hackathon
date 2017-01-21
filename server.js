'use strict'

var keypress = require('keypress')

keypress(process.stdin)

process.stdin.on('keypress', function (ch, key) {
    console.log('got keypress ['+JSON.stringify(key)+']')
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();

/*
var baseAPI = 'http://wayfindr.azurewebsites.net/wayfindr'



var apis = {
    paths : '/Paths',
    beacons : '/Beacons',
    keys : '/Keys',
    pois : '/POIs',
    stations : '/Stations',
    journeys : '/Journeys'
}




for (var key in apis) {
    if ( apis.hasOwnProperty(key) ) {
        console.log(key + ' => ' + apis[key]);
        request(baseAPI + apis[key], function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('----------------------------')
                console.log(JSON.stringify(body))
                console.log('----------------------------')
            } else {
                console.log(JSON.stringify(error))
            }
        })
    }
}
*/