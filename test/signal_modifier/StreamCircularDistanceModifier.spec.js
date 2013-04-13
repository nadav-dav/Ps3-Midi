"use strict";

var rek = require('rekuire');
var EventEmitter = rek('events').EventEmitter;
var StreamCircularDistanceModifier = rek('StreamCircularDistanceModifier');

var X_STREAM_INDEX=0;
var Y_STREAM_INDEX=1;
var RESOLUTION = 256;

describe("StreamCircularDistanceModifier", function(){
    var device = new EventEmitter();

    it("should calculate and emit the right distance from origin", function(){
        var dataReceived = []
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        StreamCircularDistanceModifier(device, X_STREAM_INDEX, Y_STREAM_INDEX , RESOLUTION)
            .on('data',callback);
        emitStream(device,[[128,128],[127,64],[127,255]]);
        expect(dataReceived).toEqual([0,64,127]);
    });
});

function emitStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i][0],stream[i][1] ]);
    }
}