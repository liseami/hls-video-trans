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
    exports.CollisionMode = void 0;
    var CollisionMode;
    (function (CollisionMode) {
        CollisionMode["absorb"] = "absorb";
        CollisionMode["bounce"] = "bounce";
        CollisionMode["destroy"] = "destroy";
    })(CollisionMode || (exports.CollisionMode = CollisionMode = {}));
});
