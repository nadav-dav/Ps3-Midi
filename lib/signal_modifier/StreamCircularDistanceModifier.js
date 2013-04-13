"use strict";

var rek = require('rekuire');
var events = require('events');
var util = require('util');
var Stream = rek('Stream');

function StreamCircularDistanceModifier(device,xStreamIndex, yStreamIndex, resolution){
    resolution = resolution || 128;
    return new _StreamCircularDistanceModifier(device, xStreamIndex, yStreamIndex, resolution);
}

function _StreamCircularDistanceModifier(device, xStreamIndex, yStreamIndex, resolution){
    Stream(device,[xStreamIndex, yStreamIndex]).on('data',function(data){
        var radius = resolution / 2;
        var x = Math.abs(data[0]- radius);
        var y = Math.abs(data[1] - radius);
        var distance = Math.sqrt( Math.pow(x,2) + Math.pow(y,2));
        this.emit('data', Math.floor( (distance/radius) * 128 ));
    }.bind(this));
}

util.inherits(_StreamCircularDistanceModifier, events.EventEmitter);


module.exports = StreamCircularDistanceModifier;
      