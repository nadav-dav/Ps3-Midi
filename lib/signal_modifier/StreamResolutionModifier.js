"use strict";

var rek = require('rekuire');
var events = require('events');
var util = require('util');


/**
 *
 * @param device
 * @param streamIndex
 * @param [resolution]
 * @constructor
 */
function StreamResolutionModifier(device,streamIndex, resolution){
    resolution = resolution || 128;
    return new _StreamResolutionModifier(device,streamIndex, resolution);
}

function _StreamResolutionModifier(device,streamIndex, resolution){
    var modifier = 128 / resolution;
    device.on('data',function(data){
        this.emit('data', Math.floor(data[streamIndex] * modifier));
    }.bind(this));
}

util.inherits(_StreamResolutionModifier, events.EventEmitter);



module.exports = StreamResolutionModifier;
      