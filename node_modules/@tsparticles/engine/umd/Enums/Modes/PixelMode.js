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
    exports.PixelMode = void 0;
    var PixelMode;
    (function (PixelMode) {
        PixelMode["precise"] = "precise";
        PixelMode["percent"] = "percent";
    })(PixelMode || (exports.PixelMode = PixelMode = {}));
});
