"use strict";

var rek = require('rekuire');
var TriggerController = rek('TriggerController')


function PressureController(stream,callback){
    var isOn = false;

    stream.on('data',function(data){
        if (data > 0){
            isOn = true;
            callback( Math.floor(data));
        }else{
            if (isOn){
                isOn = false;
                callback(0);
            }
        }
    }.bind(this));
}

module.exports = PressureController;
      