"use strict";

var rek = require('rekuire');
var EventEmitter = rek('events').EventEmitter;
var ToggleController = rek('ToggleController');

describe("ToggleController", function(){
    var device = new EventEmitter();

    it("should callback with 'on' when the signal toggles, and then off", function(){
        var states = [];
        var callback = createSpy('callback').andCallFake(function(state){
            states.push(state);
        });
        ToggleController(device,0,callback);
        emitStream(device,[0,0,20,30,40,0,0,0,20,30,0,0,0]);
        expect(states).toEqual([true,false]);
    });
});

function emitStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i]]);
    }
}