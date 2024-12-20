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
    exports.RotateDirection = void 0;
    var RotateDirection;
    (function (RotateDirection) {
        RotateDirection["clockwise"] = "clockwise";
        RotateDirection["counterClockwise"] = "counter-clockwise";
        RotateDirection["random"] = "random";
    })(RotateDirection || (exports.RotateDirection = RotateDirection = {}));
});
