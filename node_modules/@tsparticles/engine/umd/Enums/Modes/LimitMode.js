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
    exports.LimitMode = void 0;
    var LimitMode;
    (function (LimitMode) {
        LimitMode["delete"] = "delete";
        LimitMode["wait"] = "wait";
    })(LimitMode || (exports.LimitMode = LimitMode = {}));
});
