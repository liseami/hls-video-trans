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
    exports.ThemeMode = void 0;
    var ThemeMode;
    (function (ThemeMode) {
        ThemeMode["any"] = "any";
        ThemeMode["dark"] = "dark";
        ThemeMode["light"] = "light";
    })(ThemeMode || (exports.ThemeMode = ThemeMode = {}));
});
