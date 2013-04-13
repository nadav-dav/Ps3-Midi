"use strict";

var rek = require('rekuire');


function ValueTriggerController(stream, valueToMonitor,callback){
    var isPressed = false;

    stream.on('data',function(data){
        if (isPressed){
            if (data !== valueToMonitor){
                isPressed = false;
                callback(false);
            }
        }else{
            if (data === valueToMonitor){
                isPressed = true;
                callback(true);
            }
        }
    }.bind(this));
}

module.exports = ValueTriggerController;
      