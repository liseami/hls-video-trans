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
    exports.DestroyType = void 0;
    var DestroyType;
    (function (DestroyType) {
        DestroyType["none"] = "none";
        DestroyType["max"] = "max";
        DestroyType["min"] = "min";
    })(DestroyType || (exports.DestroyType = DestroyType = {}));
});
