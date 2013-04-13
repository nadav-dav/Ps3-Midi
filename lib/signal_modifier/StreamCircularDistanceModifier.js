"use strict";

var rek = require('rekuire');
var events = require('events');
var util = require('util');

function StreamCircularDistanceModifier(device,xStreamIndex, yStreamIndex, resolution){
    resolution = resolution || 128;
    return new _StreamCircularDistanceModifier(device, xStreamIndex, yStreamIndex, resolution);
}

function _StreamCircularDistanceModifier(device, xStreamIndex, yStreamIndex, resolution){
    device.on('data',function(data){
        var radius = resolution / 2;
        var x = Math.abs(data[xStreamIndex]- radius);
        var y = Math.abs(data[yStreamIndex] - radius);
        var distance = Math.sqrt( Math.pow(x,2) + Math.pow(y,2));
        this.emit('data', Math.floor( (distance/radius) * 128 ));
    }.bind(this));
}

util.inherits(_StreamCircularDistanceModifier, events.EventEmitter);


module.exports = StreamCircularDistanceModifier;
      