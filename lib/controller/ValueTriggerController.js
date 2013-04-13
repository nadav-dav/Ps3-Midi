"use strict";

var rek = require('rekuire');


function ValueTriggerController(device,streamIndex, valueToMonitor,callback){
    var isPressed = false;

    device.on('data',function(data){
        if (isPressed){
            if (data[streamIndex] !== valueToMonitor){
                isPressed = false;
                callback(false);
            }
        }else{
            if (data[streamIndex] === valueToMonitor){
                isPressed = true;
                callback(true);
            }
        }
    }.bind(this));
}

module.exports = ValueTriggerController;
      