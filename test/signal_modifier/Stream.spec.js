"use strict";

var rek = require('rekuire');
var EventEmitter = rek('events').EventEmitter;
var Stream = rek('Stream');

var STREAM_INDEX=0;

describe("Stream", function(){
    var device = new EventEmitter();

    it("should pass the signal through", function(){
        var dataReceived = []
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        Stream(device, STREAM_INDEX)
            .on('data',callback);
        emitStream(device,[10,20,30]);
        expect(dataReceived).toEqual([10,20,30])
    });
});

function emitStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i]]);
    }
}