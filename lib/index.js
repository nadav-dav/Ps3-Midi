var midi = require('midi');
var rek = require('rekuire');
var DSConsts = rek('DualShockConst');
var JoystickController = rek('JoystickController');
var DualShock = rek('DualShock');


var midiout = createMidiOutInterface("Node Midi");
var dualshock = new DualShock();

var x = new JoystickController(   dualshock,
                                DSConsts.triggers.RIGHT_STICK_X,
                                DSConsts.triggers.RIGHT_STICK_Y,
                                DSConsts.resolution,
                                function(mode, value){
    console.log('Getting Data:',mode, value);
    midiout.sendMessage([128+48+mode, DSConsts.triggers.CROSS, value] );
});

dualshock.start();


function createMidiOutInterface(name){
    var output = new midi.output();
    output.openVirtualPort(name);
    return output;
}