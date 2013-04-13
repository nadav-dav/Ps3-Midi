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
        var rtData = [];
        if (Array.isArray(streamIndex)){
            for(var i in streamIndex){
                rtData.push(data[ streamIndex[i] ]);
            }
        }else{
            rtData = Math.floor(data[streamIndex])
        }

        this.emit('data', rtData);
    }.bind(this));
}

util.inherits(_Stream, events.EventEmitter);

module.exports = Stream;
      