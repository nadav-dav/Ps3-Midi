"use strict";

var rek = require('rekuire');
var EventEmitter = rek('events').EventEmitter;
var StreamCircularAngleModifier = rek('StreamCircularAngleModifier');

var X_STREAM_INDEX=0;
var Y_STREAM_INDEX=1;
var RESOLUTION = 256;

describe("StreamCircularAngleModifier", function(){
    var device = new EventEmitter();

    it("should calculate and emit the right angle from origin", function(){
        var dataReceived = []
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        StreamCircularAngleModifier(device, X_STREAM_INDEX, Y_STREAM_INDEX , RESOLUTION)
            .on('data',callback);
        emitStream(device,[[128,255],[255,127]]);
        expect(dataReceived).toEqual([0,90]);
    });
});

function emitStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i][0],stream[i][1] ]);
    }
}