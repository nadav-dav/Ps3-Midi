"use strict";

var rek = require('rekuire');
var TriggerController = rek('TriggerController');


function ToggleController(device,streamIndex,callback){
    var isOn = false;
    TriggerController(device,streamIndex, function(state){
        if(state){
            isOn = !isOn;
            callback(isOn);
        }
    });

    return {
        initValue : function(val){
            isOn = val;
        }
    };
}

module.exports = ToggleController;
      