"use strict";

var rek = require('rekuire');
var EventEmitter = rek('events').EventEmitter;
var ToggleController = rek('ToggleController');
var StreamResolutionModifier = rek('StreamResolutionModifier');

describe("ToggleController", function(){
    var device = new EventEmitter();
    var stream = StreamResolutionModifier(device,0);


    it("should callback with 'on' when the signal toggles, and then off", function(){
        var states = [];
        var callback = createSpy('callback').andCallFake(function(state){
            states.push(state);
        });
        ToggleController(stream,callback);
        emitStream(device,[0,0,20,30,40,0,0,0,20,30,0,0,0]);
        expect(states).toEqual([true,false]);
    });

    it("should support initial value injection", function(){
        var states = [];
        var callback = createSpy('callback').andCallFake(function(state){
            states.push(state);
        });
        ToggleController(stream,callback).initValue(true);
        emitStream(device,[0,0,20,30,40,0,0,0,0,0]);
        expect(states).toEqual([false]);
    });
});

function emitStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i]]);
    }
}