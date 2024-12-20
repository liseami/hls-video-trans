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
    exports.ProcessBubbleType = void 0;
    var ProcessBubbleType;
    (function (ProcessBubbleType) {
        ProcessBubbleType["color"] = "color";
        ProcessBubbleType["opacity"] = "opacity";
        ProcessBubbleType["size"] = "size";
    })(ProcessBubbleType || (exports.ProcessBubbleType = ProcessBubbleType = {}));
});
