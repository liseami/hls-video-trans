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
    exports.GradientType = void 0;
    var GradientType;
    (function (GradientType) {
        GradientType["linear"] = "linear";
        GradientType["radial"] = "radial";
        GradientType["random"] = "random";
    })(GradientType || (exports.GradientType = GradientType = {}));
});
