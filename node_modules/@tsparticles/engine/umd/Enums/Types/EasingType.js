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
    exports.EasingType = void 0;
    var EasingType;
    (function (EasingType) {
        EasingType["easeInBack"] = "ease-in-back";
        EasingType["easeInCirc"] = "ease-in-circ";
        EasingType["easeInCubic"] = "ease-in-cubic";
        EasingType["easeInLinear"] = "ease-in-linear";
        EasingType["easeInQuad"] = "ease-in-quad";
        EasingType["easeInQuart"] = "ease-in-quart";
        EasingType["easeInQuint"] = "ease-in-quint";
        EasingType["easeInExpo"] = "ease-in-expo";
        EasingType["easeInSine"] = "ease-in-sine";
        EasingType["easeOutBack"] = "ease-out-back";
        EasingType["easeOutCirc"] = "ease-out-circ";
        EasingType["easeOutCubic"] = "ease-out-cubic";
        EasingType["easeOutLinear"] = "ease-out-linear";
        EasingType["easeOutQuad"] = "ease-out-quad";
        EasingType["easeOutQuart"] = "ease-out-quart";
        EasingType["easeOutQuint"] = "ease-out-quint";
        EasingType["easeOutExpo"] = "ease-out-expo";
        EasingType["easeOutSine"] = "ease-out-sine";
        EasingType["easeInOutBack"] = "ease-in-out-back";
        EasingType["easeInOutCirc"] = "ease-in-out-circ";
        EasingType["easeInOutCubic"] = "ease-in-out-cubic";
        EasingType["easeInOutLinear"] = "ease-in-out-linear";
        EasingType["easeInOutQuad"] = "ease-in-out-quad";
        EasingType["easeInOutQuart"] = "ease-in-out-quart";
        EasingType["easeInOutQuint"] = "ease-in-out-quint";
        EasingType["easeInOutExpo"] = "ease-in-out-expo";
        EasingType["easeInOutSine"] = "ease-in-out-sine";
    })(EasingType || (exports.EasingType = EasingType = {}));
});
