"use strict";

var rek = require('rekuire');
var TriggerController = rek('TriggerController')


function ToggleController(device,streamIndex,callback){
    var isOn = false;
    TriggerController(device,streamIndex, function(state){
        if(state){
            isOn = !isOn;
            callback(isOn);
        }
    })
}

module.exports = ToggleController;
      