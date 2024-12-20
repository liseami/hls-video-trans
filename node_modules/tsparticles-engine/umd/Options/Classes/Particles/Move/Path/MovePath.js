(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../ValueWithRandom", "../../../../../Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MovePath = void 0;
    const ValueWithRandom_1 = require("../../../ValueWithRandom");
    const Utils_1 = require("../../../../../Utils/Utils");
    class MovePath {
        constructor() {
            this.clamp = true;
            this.delay = new ValueWithRandom_1.ValueWithRandom();
            this.enable = false;
            this.options = {};
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.clamp !== undefined) {
                this.clamp = data.clamp;
            }
            this.delay.load(data.delay);
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            this.generator = data.generator;
            if (data.options) {
                this.options = (0, Utils_1.deepExtend)(this.options, data.options);
            }
        }
    }
    exports.MovePath = MovePath;
});
