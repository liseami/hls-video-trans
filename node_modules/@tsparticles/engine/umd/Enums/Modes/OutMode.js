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
    exports.OutMode = void 0;
    var OutMode;
    (function (OutMode) {
        OutMode["bounce"] = "bounce";
        OutMode["none"] = "none";
        OutMode["out"] = "out";
        OutMode["destroy"] = "destroy";
        OutMode["split"] = "split";
    })(OutMode || (exports.OutMode = OutMode = {}));
});
