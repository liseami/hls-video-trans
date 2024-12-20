(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../ValueWithRandom"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ZIndex = void 0;
    const ValueWithRandom_1 = require("../../ValueWithRandom");
    class ZIndex extends ValueWithRandom_1.ValueWithRandom {
        constructor() {
            super();
            this.opacityRate = 1;
            this.sizeRate = 1;
            this.velocityRate = 1;
        }
        load(data) {
            super.load(data);
            if (!data) {
                return;
            }
            if (data.opacityRate !== undefined) {
                this.opacityRate = data.opacityRate;
            }
            if (data.sizeRate !== undefined) {
                this.sizeRate = data.sizeRate;
            }
            if (data.velocityRate !== undefined) {
                this.velocityRate = data.velocityRate;
            }
        }
    }
    exports.ZIndex = ZIndex;
});
