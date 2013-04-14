Ps3 DualShock -> Midi
=====================

>This project is a module created to convert ps3 controller signal to a functionable midi, that can be used in your DAW.

- - - 

To Run
-------

> 1. make sure you have [NodeJs][NodeJs] installed!
> 1. pair the PS3 controller to your Bluetooth. here is [how to].[pairOsx]
> 1. clone/download the project
> 1. navigate to the download folder using 'terminal'
> 1. run  **"npm start"**


What's functional
-----------------

- [x] Seeking for connected controller
- [x] Mapping button press to midi node
- [x] Create different controllers for Triggers, Toggles and Pressure
- [x] Create ability for _shift_ buttons
- [x] Ability for the little joysticks to be operational like dials ( [Pacemaker style] [pacemaker] - pull sideways, and then clockwise)
- [ ] Read mapping from a config file


Developers
-----------------
to test, run ```npm test```


[pacemaker]:http://www.youtube.com/watch?v=F9_0tUxdTZY
[NodeJs]:http://nodejs.org/
[pairOsx]:http://www.youtube.com/watch?v=5tEiiveuhRA