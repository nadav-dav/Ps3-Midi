"use strict";

var rek = require('rekuire');
var events = require('events');
var util = require('util');
var Stream = rek('Stream');

function StreamCircularAngleModifier(device,xStreamIndex, yStreamIndex, resolution){
    resolution = resolution || 128;
    return new _StreamCircularAngleModifier(device, xStreamIndex, yStreamIndex, resolution);
}

function _StreamCircularAngleModifier(device, xStreamIndex, yStreamIndex, resolution){
    Stream(device,[xStreamIndex, yStreamIndex]).on('data',function(data){
        var radius = resolution / 2;
        var x = data[0]- radius;
        var y = data[1] - radius;

        var theta = Math.atan2(-y, x);
        if (theta < 0)
            theta += 2 * Math.PI;

        var angle = theta * (180 / Math.PI);
        angle = (angle + 90) % 360;

        this.emit('data', Math.floor( angle ));
    }.bind(this));
}

util.inherits(_StreamCircularAngleModifier, events.EventEmitter);


module.exports = StreamCircularAngleModifier;
      