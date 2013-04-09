var midi = require('midi');
var rek = require('rekuire');
var triggers= rek('DualShockConst').triggers;

var DualShock = rek('DualShock');

var midiout = createMidiOutInterface("Node Midi");


var dualshock = new DualShock();
dualshock.listen(function(data){
    midiout.sendMessage([128+48, triggers.CROSS, Math.floor(data[triggers.CROSS] / 2)] );
})


function createMidiOutInterface(name){
    var output = new midi.output();
    output.openVirtualPort(name);
    return output;
}