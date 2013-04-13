"use strict";

var rek = require('rekuire');
var events = require('events');
var util = require('util');


function Stream (device,streamIndex){
    streamIndex = streamIndex || 0;
    var s = new _Stream(device,streamIndex);
    return s;
}

function _Stream(device,streamIndex){
    device.on('data',function(data){
        this.emit('data', Math.floor(data[streamIndex]));
    }.bind(this));
}

util.inherits(_Stream, events.EventEmitter);

module.exports = Stream;
      