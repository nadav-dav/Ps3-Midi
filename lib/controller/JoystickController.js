"use strict";

var rek = require('rekuire');
var Stream = rek('Stream'),
    StreamCircularDistanceModifier = rek('StreamCircularDistanceModifier'),
    StreamCircularAngleModifier = rek('StreamCircularAngleModifier'),
    StreamGate = rek('StreamGate');

var MODE_UP = 1;
var MODE_RIGHT = 2;
var MODE_DOWN = 3;
var MODE_LEFT = 4;
var NO_MODE = -1;

function JoystickController(device,xStreamIndex, yStreamIndex,resolution,callback){
    var modeValues = {
        1:0, 2:0, 3:0, 4:0
    }
    var resetValues = null;
    var angle = 0;
    var mode = NO_MODE;
    var lastAngle = 0;
    var startValue = 0;

    var angleStream = StreamCircularAngleModifier(device,xStreamIndex, yStreamIndex, resolution);
    var distanceStream = StreamCircularDistanceModifier(device,xStreamIndex, yStreamIndex, resolution);

    angleStream.on('data', function(data){
        angle = data;
    })

    distanceStream.on('data',function(distance){
        if (distance > 125){
            if(mode === NO_MODE){
                if (angle > 315 || angle < 45 ){
                    mode = MODE_DOWN;
                }
                else if (angle > 45 && angle < 135 ){
                    mode = MODE_RIGHT;
                }
                else if (angle > 135 && angle < 225 ){
                    mode = MODE_UP;
                }
                else if (angle > 225 && angle < 315 ){
                    mode = MODE_LEFT;
                }
                lastAngle = angle;
                startValue = modeValues[mode];
            }
            var angleChange = angle - lastAngle;
            if (angleChange > 90){angleChange -= 360};
            if (angleChange < -90){angleChange += 360};

            lastAngle = angle;
            modeValues[mode] = Math.floor(modeValues[mode] + ((angleChange)/180) * 127);
            if (modeValues[mode] > 127) {
                modeValues[mode] = 127;
            }
            if (modeValues[mode] < 0) {
                modeValues[mode] = 0;
            }
            callback(mode, modeValues[mode]);

        }else{
            if(mode !== NO_MODE){
                if (resetValues){
                    for(var key in resetValues){
                        modeValues[key] = resetValues[key];
                    }
                }
                mode = NO_MODE;
                callback(NO_MODE,null);
            }
        }

    }.bind(this));

    return {
        initValues : function(values){
            modeValues = values;
        },
        resetValues : function(values){
            resetValues = values;
        }
    }
}

module.exports = JoystickController;
      