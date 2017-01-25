# Simple Node App for the Wayfinder Hackathon.

This is a demonstration of concept for [Wayfindr](https://www.wayfindr.net/) Hackathon. Effectively a thought experiment on how [TFL](https://tfl.gov.uk/) and Wayfindr could build / improve on the [TFL api's](https://api.tfl.gov.uk/) with a focus on helping the visually impared. 

### Focus

Our team decided to focus on the part of the journey from stepping on to stepping off the train.

We picked this focus because:

1. Getting on and off the train are the most stressful moments in of the journey, even when the station is familiar to the individual
2. This situation is also stressful for sighted people, providing a point of natural empathy or relevance for the wider community
3. This seemed to be a natural way to extend the existing Wayfindr app in a way that delivered genuine additional value
4. We saw an opportunity to not only guide or support the visually impaired, but also to source their specific knowledge about stations to make the experience safer for each other  

### Learnings from our VIP mentors

The visual impaired people we spoke to, Roxana and Dave, provided the following insights:

* One of the biggest freedoms is the freedom to be left alone - to be free from the need to engage with strangers when you’re feeling down
* The level of support can vary drastically between different train networks - tube, over ground and country trains
* The physical risks associated with getting on buses - steps, curbs, etc - is far greater that for trains, which suggests a natural extension of our solution to buses
* Reliance on VIP services at the station makes it problematic to change journey plans. Not turning up at a station as expected can lead to a wild goose chase for a missing VIP.
* VIPs like Roxana, with partial sight, like to have a multimodal experience, so they confirm what they heard, or choose which sensory they prefer.

### Demo Scenario

Our demo starts with our VIP commuter, Penny, standing on the platform.
Penny has been guided down to the platform using the Wayfindr app, so we already know where she’s heading, which train she’s taking, which and station she’s travelling to, and that she’s on the right platform. 

Today, Penny is travelling on the Northern Line from Borough to Old Street.

### Design principles

1. Do not disturb 
  * ask for permission to talk to the commuter
2. Almost hands-free 
  * keep interactions to an absolutely minimum, we imagined a bluetooth headset or a bone induction headphones with a single button
3. Regions and thresholds
  * beacons aren't accurate enough to determine a person's location with sub-metre accuracy
4. Flow and autonomy
  * step-by-step instructions can actually undermine autonomy and personal space, instead help people prepare for a transition, so they can decide for themselves, and gracefully handle the new environment


### The Experience
Penny will be alerted by an audio chime whenever the app has something to tell her. Each interaction will be driven by a simple button click, this could either be through a bluetooth headset or perhaps the home button or one of the other buttons on her phone. The application will cache the journey and all relevant information at the origin station and we envisage that it will attempt to connect to the network while on the journey to continually check her route is the most relevant. 

#### Scene 1: Arriving on platform

Triggered by detection of platform beacons, the app offers safety information about the platform, the expected wait time, and the number of trains before Penny's.

#### Scene 2: Is this my train?

A train arrives on the platform. Penny asks herself “Is this my train?” She taps her device for an update. The app responds with updated expected wait time, and number of trains before hers.

#### Scene 3: Your train is arriving

Triggered by imminent arrival of her train (using TfL data), the app warns Penny so she can prepare to board.

#### Scene 4: Leaving origin

Once the train has pulled away from the station, the app asks Penny is there is any safety information she would like to share about the station she has just left. (Note, we imagine this might be triggered only on longer journeys, or where existing station information is poor)

#### Scene 5: How much further?

Penny has been chatting to her sister on the phone, and has missed a station announcement. She taps her device for an update.

#### Scene 6: Disruption Alert

The app will attempt to update journey information from TfL whenever it is at a station, allowing it to receive disruption notifications. In that instance, the app will offer Penny the option of switching to an alternate route.

#### Scene 7: One more stop

Because VIPs need time to disembark, the app notifies Penny that she is now approaching the last stop before her destination.

#### Scene 8: Arriving at destination

On arriving at her destination, Penny is provided with safety information about the platform where she will disembark (e.g. is there a wall opposite?) and help her prepare to turn toward the correct exit for her journey.

### Conversational Mockup

A conversational mockup of the scenes above is available here: https://www.messenger.com/t/214552135618021/
It was built with the Chatfuel bot platform https://dashboard.chatfuel.com/#/bots. 

### The Application
This is a very simple node.js application that is designed to operate without a visual UI, something that forced us to think about how to build an effective conversational UI to operate while on journey. 

All beacon events are mocked, instructions to drive the demonstration. (every keypress described below needs to be 'keypress enter'). 

* 'z' (enter) will fire the beacon event. These are coded in the data/beacons.json file and will cycle in the order they are listed. First run through the demo you should simply just keep firing beacon events and watch  the console output. 
* '1' (enter) will fire the "Arrived at Origin Platform" event. This is where our scenario begins and Penny is waiting for her train.
* '2' (enter) will fire the "Departed and on your journey" event. We see this as an opportunity for Penny to provide feedback to anyone else using the app about possible changes or temporary hazards that she encountered in the station. 
* '3' (enter) will fire the "Disruption to Journey" event. This scenario is when Penny is mid-journey and there has been a change (e.g. the station has changed it's destination or perhaps an accident has occured ahead). It is a chance to give Penny the choice to re-route or wait an estimated amount of time. 
* '4' (enter) wil fire the "Penultimate Station" event. During user interviews we found that getting notification as your stop is up next gives riders time to prepare for disembarking the train. This also gives us an opportunity to offer information about the station and platform they will be getting off the train at. 
* '5' (enter) will fire the "Arrived at Destination" event. This is short and simple with a focus on the next immediate concern for the rider.
* 'a' (enter) at any time will tell the rider how many stops there are until the final destination.

The journey is mocked in the journey.json file, this also maps beacons to stations. 

### Running

We use [NPM](https://docs.npmjs.com/getting-started/what-is-npm) to manage the node stuff for this. If you haven't got your environment setup, visit the website and work through the installation. You will need Node.js and NPM 

```
> git clone <repo>
> cd wf-hackathon
> npm install
> npm start

```

### Assumptions
We have assumed that the Wayfindr app is going to navigate Penny through both tube stations and for this scenario we have focused on what the experience needs to be for Penny as she boards, rides and disembarks from the train. If you have glanced at the code, you will notice that there is actually no calls to any APIs here :) 

Another assumption is that, because we know her expected journey, we can download all the Beacon UDID's and safety information available while Penny is above ground (i.e. at the station entrance, at the latest). 

### Contributors
Justin Tauber - User Experience (@brtrx)

Edoardo Pignot - Developer



