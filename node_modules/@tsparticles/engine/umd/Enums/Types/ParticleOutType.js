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
    exports.ParticleOutType = void 0;
    var ParticleOutType;
    (function (ParticleOutType) {
        ParticleOutType["normal"] = "normal";
        ParticleOutType["inside"] = "inside";
        ParticleOutType["outside"] = "outside";
    })(ParticleOutType || (exports.ParticleOutType = ParticleOutType = {}));
});
