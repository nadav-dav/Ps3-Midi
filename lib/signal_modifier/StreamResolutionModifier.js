"use strict";

var rek = require('rekuire');
var events = rek('events');
var util = rek('util');
var Stream = rek('Stream');

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
    Stream(device, streamIndex). on('data',function(data){
        this.emit('data', Math.floor(data * modifier));
    }.bind(this));
}

util.inherits(_StreamResolutionModifier, events.EventEmitter);



module.exports = StreamResolutionModifier;
      