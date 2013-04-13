"use strict";

var rek = require('rekuire');

var MODE_1 = 1;
var MODE_2 = 2;
var MODE_3 = 3;
var MODE_4 = 4;
var NO_MODE = -1;

function JoystickController(device,xStreamIndex, yStreamIndex,resolution,callback){
    var modeValues = {
        1:0, 2:0, 3:0, 4:0
    }
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

module.exports = JoystickController;
      