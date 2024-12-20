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
    exports.OutModeDirection = void 0;
    var OutModeDirection;
    (function (OutModeDirection) {
        OutModeDirection["bottom"] = "bottom";
        OutModeDirection["left"] = "left";
        OutModeDirection["right"] = "right";
        OutModeDirection["top"] = "top";
    })(OutModeDirection || (exports.OutModeDirection = OutModeDirection = {}));
});
