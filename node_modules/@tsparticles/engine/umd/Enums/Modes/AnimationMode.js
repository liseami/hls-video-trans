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
    exports.AnimationMode = void 0;
    var AnimationMode;
    (function (AnimationMode) {
        AnimationMode["auto"] = "auto";
        AnimationMode["increase"] = "increase";
        AnimationMode["decrease"] = "decrease";
        AnimationMode["random"] = "random";
    })(AnimationMode || (exports.AnimationMode = AnimationMode = {}));
});
