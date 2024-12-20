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
    exports.TiltDirection = void 0;
    var TiltDirection;
    (function (TiltDirection) {
        TiltDirection["clockwise"] = "clockwise";
        TiltDirection["counterClockwise"] = "counter-clockwise";
        TiltDirection["random"] = "random";
    })(TiltDirection || (exports.TiltDirection = TiltDirection = {}));
});
