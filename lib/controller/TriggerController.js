"use strict";

var rek = require('rekuire');


function TriggerController(device,streamIndex,callback){
    var isPressed = false;

    device.on('data',function(data){
        if (isPressed){
            if (data[streamIndex] === 0){
                isPressed = false;
                callback(false);
            }
        }else{
            if (data[streamIndex] > 0){
                isPressed = true;
                callback(true);
            }
        }
    }.bind(this));
}

module.exports = TriggerController;
      