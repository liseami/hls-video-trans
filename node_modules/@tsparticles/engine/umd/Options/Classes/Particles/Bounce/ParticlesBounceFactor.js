(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../ValueWithRandom.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParticlesBounceFactor = void 0;
    const ValueWithRandom_js_1 = require("../../ValueWithRandom.js");
    class ParticlesBounceFactor extends ValueWithRandom_js_1.ValueWithRandom {
        constructor() {
            super();
            this.value = 1;
        }
    }
    exports.ParticlesBounceFactor = ParticlesBounceFactor;
});
