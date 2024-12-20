(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.calculateBubbleValue = calculateBubbleValue;
    const engine_1 = require("@tsparticles/engine");
    function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
        if (modeValue >= optionsValue) {
            const value = particleValue + (modeValue - optionsValue) * ratio;
            return (0, engine_1.clamp)(value, particleValue, modeValue);
        }
        else if (modeValue < optionsValue) {
            const value = particleValue - (optionsValue - modeValue) * ratio;
            return (0, engine_1.clamp)(value, modeValue, particleValue);
        }
    }
});
