(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SplitFactor = void 0;
    const engine_1 = require("@tsparticles/engine");
    class SplitFactor extends engine_1.ValueWithRandom {
        constructor() {
            super();
            this.value = 3;
        }
    }
    exports.SplitFactor = SplitFactor;
});
