"use strict";

var rek = require('rekuire');
var EventEmitter = rek('events').EventEmitter;
var StreamGate = rek('StreamGate');

var STREAM_INDEX=0;

describe("StreamGate", function(){
    var device = new EventEmitter();

    it("should pass the signal through", function(){
        var dataReceived = []
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        StreamGate(device, STREAM_INDEX,0,127)
            .on('data',callback);
        emitStream(device,[10,20,30]);
        expect(dataReceived).toEqual([10,20,30])
    });

    it("should filter signal that are below the lower threshold", function(){
        var dataReceived = []
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        StreamGate(device, STREAM_INDEX,50,127)
            .on('data',callback);
        emitStream(device,[10,20,30,40,50,60,70,80]);
        expect(dataReceived).toEqual([50,60,70,80]);
    });

    it("should filter signal that are above the higher threshold", function(){
        var dataReceived = []
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        StreamGate(device, STREAM_INDEX,0,50)
            .on('data',callback);
        emitStream(device,[10,20,30,40,50,60,70,80]);
        expect(dataReceived).toEqual([10,20,30,40,50]);
    });
});

function emitStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i]]);
    }
}