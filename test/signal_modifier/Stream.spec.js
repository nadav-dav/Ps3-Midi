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

    it("should treat no stream index as 0", function(){
        var dataReceived = []
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        Stream(device)
            .on('data',callback);
        emitStream(device,[10,20,30]);
        expect(dataReceived).toEqual([10,20,30])
    });

    it("should support more than one signal index", function(){
        var dataReceived = []
        var callback = createSpy('callback').andCallFake(function(data){
            dataReceived.push(data);
        });
        Stream(device, [0,1])
            .on('data',callback);
        emitDoubleStream(device,[[1,2],[3,4],[5,6]]);
        expect(dataReceived).toEqual([[1,2],[3,4],[5,6]])
    });
});

function emitStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i]]);
    }
}

function emitDoubleStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i][0],stream[i][1] ]);
    }
}