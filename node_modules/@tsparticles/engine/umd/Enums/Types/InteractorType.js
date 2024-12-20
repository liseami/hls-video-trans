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
    exports.InteractorType = void 0;
    var InteractorType;
    (function (InteractorType) {
        InteractorType["external"] = "external";
        InteractorType["particles"] = "particles";
    })(InteractorType || (exports.InteractorType = InteractorType = {}));
});
