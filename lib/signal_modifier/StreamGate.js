"use strict";

var rek = require('rekuire');
var events = require('events');
var util = require('util');
var Stream = rek('Stream');


function StreamGate (device,streamIndex, lowerThreshold, higherThreshold){
    var s = new _StreamGate(device, streamIndex, lowerThreshold, higherThreshold);
    return s;
}

function _StreamGate(device, streamIndex, lowerThreshold, higherThreshold){
    Stream(device, streamIndex).on('data',function(data){
        if (data >= lowerThreshold && data <= higherThreshold){
            this.emit('data', data);
        }
    }.bind(this));
}

util.inherits(_StreamGate, events.EventEmitter);

module.exports = StreamGate;
      