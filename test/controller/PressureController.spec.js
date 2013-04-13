"use strict";

var rek = require('rekuire');
var EventEmitter = rek('events').EventEmitter;
var PressureController = rek('PressureController');
var StreamResolutionModifier = rek('StreamResolutionModifier');

describe("PressureController", function(){
    var device = new EventEmitter();
    var stream = StreamResolutionModifier(device,0,128);

    it("should callback with level when the signal changes", function(){
        var dataReceived = [];
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        PressureController(stream,callback);
        emitStream(device,[10,20,30,40]);
        expect(dataReceived).toEqual([10,20,30,40]);
    });
    
    it("should not send more than one 'zero' value", function(){
        var dataReceived = [];
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        PressureController(stream,callback);
        emitStream(device,[10,20,30,40,0,0,0,0,0]);
        expect(dataReceived).toEqual([10,20,30,40,0]);
    });
});

function emitStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i]]);
    }
}