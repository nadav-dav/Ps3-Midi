"use strict";

var rek = require('rekuire');
var TriggerController = rek('TriggerController');


function ToggleController(stream,callback){
    var isOn = false;
    TriggerController(stream, function(state){
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
      