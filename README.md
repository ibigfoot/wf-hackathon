# Simple Node App for the Wayfinder Hackathon.

This is a demonstration of concept for [Wayfindr](https://www.wayfindr.net/) Hackathon. Effectively a thought experiment on how [TFL](https://tfl.gov.uk/) and Wayfindr could build / improve on the [TFL api's]((https://api.tfl.gov.uk/)) with a focus on helping the visually impared. 

### The Journey
Penny is a visually impared traveller who needs to get from her local Tube station, Borough, to Moorefields Eye Hospital that is near Old Street station. 
Today, Penny is using Wayfindr and TFL APIs to help her naviagte the tube. 

### The Demonstration
This is a very simple node.js application that is designed to operate without a visual UI, something that forced us to think about how to build an effective conversational UI to operate while on journey. 

All beacon events are mocked, instructions to drive the demonstration. (every keypress described below needs to be 'keypress enter')

* 'z' (enter) will fire the beacon event. These are coded in the data/beacons.json file and will cycle in the order they are listed. First run through the demo you should simply just keep firing beacon events and watch  the console output. 
* '1' (enter) will fire the "Arrived at Origin Platform" event. This is where our scenario begins and Penny is waiting for her train.
* '2' (enter) will fire the "Departed and on your journey" event. We see this as an opportunity for Penny to provide feedback to anyone else using the app about possible changes or temporary hazards that she encountered in the station. 
* '3' (enter) will fire the "Disruption to Journey" event. This scenario is when Penny is mid-journey and there has been a change (e.g. the station has changed it's destination or perhaps an accident has occured ahead). It is a chance to give Penny the choice to re-route or wait an estimated amount of time. 
* '4' (enter) wil fire the "Penultimate Station" event. During user interviews we found that getting notification as your stop is up next gives riders time to prepare for disembarking the train. This also gives us an opportunity to offer information about the station and platform they will be getting off the train at. 
* '5' (enter) will fire the "Arrived at Destination" event. This is short and simple with a focus on the next immediate concern for the rider.


### Assumptions
We have assumed that the Wayfindr app is going to navigate Penny through both tube stations and for this scenario we have focused on what the experience needs to be for Penny as she boards, rides and disembarks from the train. If you have glanced at the code, you will notice that there is actually no calls to any APIs here :) 

### The Experience
Penny will be alerted by an audio chime whenever the app has something to tell her. Each interaction will be driven by a simple button click, this could either be through a bluetooth headset or perhaps the home button or one of the other buttons on her phone. The application will cache the journey and all relevant information at the origin station and we envisage that it will attempt to connect to the network while on the journey to continually check her route is the most relevant. 

### Contributors
Justin Tauber - User Experience
Edoardo Pignot - Developer



