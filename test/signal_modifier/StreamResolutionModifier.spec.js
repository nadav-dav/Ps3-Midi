"use strict";

var rek = require('rekuire');
var EventEmitter = rek('events').EventEmitter;
var StreamResolutionModifier = rek('StreamResolutionModifier');

var STREAM_INDEX=0;

describe("StreamResolutionModifier", function(){
    var device = new EventEmitter();

    it("should pass the signal through", function(){
        var resolution = 128;
        var dataReceived = []
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        StreamResolutionModifier(device, STREAM_INDEX,resolution)
            .on('data',callback);
        emitStream(device,[10,20,30]);
        expect(dataReceived).toEqual([10,20,30])
    });

    it("should change the signal according to resolution", function(){
        var resolution = 256;
        var dataReceived = []
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        StreamResolutionModifier(device, STREAM_INDEX,resolution)
            .on('data',callback);
        emitStream(device,[10,20,30]);
        expect(dataReceived).toEqual([5,10,15])
    });
});

function emitStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i]]);
    }
}