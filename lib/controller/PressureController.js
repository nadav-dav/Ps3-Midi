"use strict";

var rek = require('rekuire');
var TriggerController = rek('TriggerController')


function PressureController(device,streamIndex,resolution,callback){
    var isOn = false;
    var resolutionModifier = 128 / resolution;

    device.on('data',function(data){
        if (data[streamIndex] > 0){
            isOn = true;
            callback( Math.floor(data[streamIndex] * resolutionModifier));
        }else{
            if (isOn){
                isOn = false;
                callback(0);
            }
        }
    }.bind(this));
}

module.exports = PressureController;
      