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
    exports.AnimationStatus = void 0;
    var AnimationStatus;
    (function (AnimationStatus) {
        AnimationStatus["increasing"] = "increasing";
        AnimationStatus["decreasing"] = "decreasing";
    })(AnimationStatus || (exports.AnimationStatus = AnimationStatus = {}));
});
