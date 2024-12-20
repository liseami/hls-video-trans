(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventType = void 0;
    var EventType;
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
    })(EventType || (exports.EventType = EventType = {}));
});
