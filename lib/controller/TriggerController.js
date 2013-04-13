"use strict";

var rek = require('rekuire');


function TriggerController(stream, callback){
    var isPressed = false;

    stream.on('data',function(data){
        if (isPressed){
            if (data === 0){
                isPressed = false;
                callback(false);
            }
        }else{
            if (data > 0){
                isPressed = true;
                callback(true);
            }
        }
    }.bind(this));
}

module.exports = TriggerController;
      