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
    exports.EmitterClickMode = void 0;
    var EmitterClickMode;
    (function (EmitterClickMode) {
        EmitterClickMode["emitter"] = "emitter";
    })(EmitterClickMode || (exports.EmitterClickMode = EmitterClickMode = {}));
});
