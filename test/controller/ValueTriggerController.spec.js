"use strict";

var rek = require('rekuire');
var EventEmitter = rek('events').EventEmitter;
var ValueTriggerController = rek('ValueTriggerController');
var Stream = rek('Stream');

describe("ValueTriggerController", function(){
    var device = new EventEmitter();
    var stream = Stream(device,0,128);
    var TIGGER_VALUE = 20;

    it("should callback with 'on' when the exact value is met", function(){
        var states = [];
        var callback = createSpy('callback').andCallFake(function(state){
            states.push(state);
        });
        ValueTriggerController(stream, TIGGER_VALUE, callback);
        emitStream(device,[0,0,10,20,20,20]);
        expect(states).toEqual([true]);
    });

    it("should callback with 'off' when the exact value is no longer met", function(){
        var states = [];
        var callback = createSpy('callback').andCallFake(function(state){
            states.push(state);
        });
        ValueTriggerController(stream, TIGGER_VALUE,callback);
        emitStream(device,[0,0,10,20,20,20,50,70]);
        expect(states).toEqual([true,false]);
    });
});

function emitStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i]]);
    }
}