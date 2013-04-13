"use strict";
var HID = require('node-hid');
var events = require('events');
var util = require('util');

function DualShock (){
    this.device = this._getPlaystationDevice(HID.devices());
    this.listening = false;
    if (this.device == null){
        throw 'Unable to find a connected PS3 controller';
    }
};

util.inherits(DualShock, events.EventEmitter);

DualShock.prototype.start = function(){
    this.listening = true;
    this._waitForDeviceInput();
    return this;
}
DualShock.prototype.stop = function(){
    this.listening = false;
    return this;
}


DualShock.prototype._waitForDeviceInput = function (){
    this.device.read(function(error, data) {
        if (error) throw error;
        this.emit("data",data);
        if (this.listening){
            this._waitForDeviceInput();
        }
    }.bind(this));
}

DualShock.prototype._getPlaystationDevice = function(devices){
    for (var i in devices){
        var device = devices[i];
        if (device.product === 'PLAYSTATION(R)3 Controller' && device.serialNumber !== ''){
            return new HID.HID(device.path);
        }
    }
}

module.exports = DualShock;