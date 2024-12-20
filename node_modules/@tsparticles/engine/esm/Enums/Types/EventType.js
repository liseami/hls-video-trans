export var EventType;
(function (EventType) {
    EventType["configAdded"] = "configAdded";
    EventType["containerInit"] = "containerInit";
    EventType["particlesSetup"] = "particlesSetup";
    EventType["containerStarted"] = "containerStarted";
    EventType["containerStopped"] = "containerStopped";
    EventType["containerDestroyed"] = "containerDestroyed";
    EventType["containerPaused"] = "containerPaused";
    EventType["containerPlay"] = "containerPlay";
    EventType["containerBuilt"] = "containerBuilt";
    EventType["particleAdded"] = "particleAdded";
    EventType["particleDestroyed"] = "particleDestroyed";
    EventType["particleRemoved"] = "particleRemoved";
})(EventType || (EventType = {}));
