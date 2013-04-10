"use strict";

var rek = require('rekuire');
var proxyquire = rek('proxyquire');

describe("DualShock", function(){
    var dualshock = null;
    var HID = null;
    var HIDReadSpy = createSpy('read');

    function HIDDevice(name){
        this.name = name;
        this.read = HIDReadSpy;
    }

    beforeEach(function(){
        HID = { HID: HIDDevice }
        var DualShock = proxyquire(rek({localPath:'DualShock'}), { 'node-hid': HID });;
        dualshock = new DualShock();
    });


    it("should find the right controller that has serial number", function(done){

        var device = dualshock._getPlaystationDevice(devices);
        expect(device).toEqual(new HIDDevice('USB_PATH3'));
        done();
    });
    
    it("should emit 'data' event when new data is revceived", function(){
        var fakeCallback;
        var dataListener = createSpy('dataListener')
        HIDReadSpy.andCallFake(function(callback){
            fakeCallback = callback;
        });
        dualshock.on('data',dataListener);
        dualshock.start();
        fakeCallback(null,'someData');

        expect(dataListener).toHaveBeenCalledWith('someData');
    });
});


var devices = [
    { vendorId: 1234,
        productId: 111,
        path: 'USB_PATH1',
        serialNumber: '',
        manufacturer: 'Sony',
        product: 'PLAYSTATION(R)3 Controller',
        release: 256,
        interface: -1
    },
    { vendorId: 666,
        productId: 112,
        path: 'USB_PATH2',
        serialNumber: '',
        manufacturer: 'Microshaft',
        product: 'Mouse',
        release: 256,
        interface: -1
    },
    { vendorId: 1234,
        productId: 113,
        path: 'USB_PATH3',
        serialNumber: 'I HAVE SERIAL NUMBER',
        manufacturer: 'Sony',
        product: 'PLAYSTATION(R)3 Controller',
        release: 256,
        interface: -1
    }
]
