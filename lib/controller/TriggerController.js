"use strict";

var rek = require('rekuire');


function TriggerController(device,streamIndex){
    this._device = device;
    this._streamIndex = streamIndex;
    this._isPressed = false;
}

TriggerController.prototype.listen = function(callback){
    var streamIndex = this._streamIndex;
    this._device.on('data',function(data){
        if (this._isPressed){
            if (data[streamIndex] === 0){
                this._isPressed = false;
                callback(false);
            }
        }else{
            if (data[streamIndex] > 0){
                this._isPressed = true;
                callback(true);
            }
        }
    }.bind(this));
}

module.exports = TriggerController;
      