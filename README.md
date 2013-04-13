Ps3 DualShock -> Midi
=====================

>This project is a module created to convert ps3 controller signal to a functionable midi, that can be used in your DAW.

- - - 

To Run
-------

> 1. pair the PS3 controller to your Bluetooth
> 1. clone the project
> 1. run  **"npm install"**
> 1. run  **"node . "**


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