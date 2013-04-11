var midi = require('midi');
var rek = require('rekuire');
var DSConsts = rek('DualShockConst');
var PressureController = rek('PressureController');
var DualShock = rek('DualShock');


var midiout = createMidiOutInterface("Node Midi");
var dualshock = new DualShock();

var x = new PressureController(   dualshock,
                                DSConsts.triggers.CROSS,
                                DSConsts.resolution,
                                function(pressure){

    console.log('Getting Data:',pressure);
    midiout.sendMessage([128+48, DSConsts.triggers.CROSS, pressure] );
});

dualshock.start();


function createMidiOutInterface(name){
    var output = new midi.output();
    output.openVirtualPort(name);
    return output;
}