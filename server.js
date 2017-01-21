'use strict'

var keypress = require('keypress')

keypress(process.stdin)


var state = {
    journey : {}, // from TFL
    currentStation : {},  // updated as we move through the journey
    originStation : {},
    destinationStation : {}
}

process.stdin.on('keypress', function (ch, key) {
    console.log('got keypress ['+JSON.stringify(key)+']')
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }

    //     

});

process.stdin.setRawMode(true);
process.stdin.resume();
