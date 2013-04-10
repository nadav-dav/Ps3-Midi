"use strict";
var HID = require('node-hid');

function DualShock (){
    this.device = this._getPlaystationDevice(HID.devices());
    this.listening = false;
    if (this.device === null){
        throw 'Unable to find a connected PS3 controller';
    }
};

DualShock.prototype.listen = function(callback){
    this.listening = true;
    this._waitForDeviceInput(callback);

}
DualShock.prototype.close = function(){
    this.listening = false;
}


DualShock.prototype._waitForDeviceInput = function (callback){
    this.device.read(function(error, data) {
        if (error) throw error;
        callback(data);
        if (this.listening){
            this._waitForDeviceInput(callback);
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