var midi = require('midi');
var rek = require('rekuire');
var triggers= rek('DualShockConst').triggers;
var TriggerController = rek('TriggerController');

var DualShock = rek('DualShock');

var midiout = createMidiOutInterface("Node Midi");


var dualshock = new DualShock();

var x = new TriggerController(dualshock, triggers.CROSS)
x.listen(function(state){
    midiout.sendMessage([128+48, triggers.CROSS, state ? 127 : 0] );
});

dualshock.start();


function createMidiOutInterface(name){
    var output = new midi.output();
    output.openVirtualPort(name);
    return output;
}