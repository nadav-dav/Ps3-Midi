"use strict";

var rek = require('rekuire');
var EventEmitter = rek('events').EventEmitter;
var PressureController = rek('PressureController');

describe("PressureController", function(){
    var device = new EventEmitter();

    it("should callback with level when the signal changes", function(){
        var dataReceived = [];
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        PressureController(device,0,128,callback);
        emitStream(device,[10,20,30,40]);
        expect(dataReceived).toEqual([10,20,30,40]);
    });
    
    it("should shift the revceived data according to the resolution ration to 128 (midi signal range)", function(){
        var dataReceived = [];
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        PressureController(device,0,256,callback);
        emitStream(device,[10,20,30,40]);
        expect(dataReceived).toEqual([5,10,15,20]);
    });
    
    it("should not send more than one 'zero' value", function(){
        var dataReceived = [];
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        PressureController(device,0,128,callback);
        emitStream(device,[10,20,30,40,0,0,0,0,0]);
        expect(dataReceived).toEqual([10,20,30,40,0]);
    });
});

function emitStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i]]);
    }
}