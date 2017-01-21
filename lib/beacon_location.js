var Bleacon = require('bleacon');

var eventEmitter;

Bleacon.startScanning();

Bleacon.on('discover', function (bleacon) {
    eventEmitter(bleacon);
});

module.exports = function (cb) {
    eventEmitter = cb;
}