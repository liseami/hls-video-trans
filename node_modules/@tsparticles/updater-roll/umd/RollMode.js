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
    exports.RollMode = void 0;
    var RollMode;
    (function (RollMode) {
        RollMode["both"] = "both";
        RollMode["horizontal"] = "horizontal";
        RollMode["vertical"] = "vertical";
    })(RollMode || (exports.RollMode = RollMode = {}));
});
