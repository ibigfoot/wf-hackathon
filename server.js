'use strict'



var stdin = process.openStdin();
require('tty').setRawMode(true)
stdin.on('keypress', function (chunk, key) {
    process.stdout.write('Get chunk')
})