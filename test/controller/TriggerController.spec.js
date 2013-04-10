"use strict";

var rek = require('rekuire');
var EventEmitter = rek('events').EventEmitter;
var TriggerController = rek('TriggerController');

describe("TriggerController", function(){
    var controller;
    var device = new EventEmitter();
    beforeEach(function(){
        controller = new TriggerController(device,0);
    });
    
    it("should callback with 'on' when the signal increases", function(){
        var callback = createSpy('callback');
        controller.listen(callback);
        emitStream(device,[0,0,0,0,10,20,30,40,50]);
        expect(callback.callCount).toBe(1);
        expect(callback).toHaveBeenCalledWith(true);
    });

    it("should callback with 'off' when the signal decreases", function(){
        var states = [];
        var callback = createSpy('callback').andCallFake(function(state){
            states.push(state);
        });
        controller.listen(callback);
        emitStream(device,[0,0,20,30,40,0,0,0]);
        expect(states).toEqual([true,false]);
    });
});

function emitStream(device,stream){
    for( var i in stream){
        device.emit('data',[stream[i]]);
    }
}