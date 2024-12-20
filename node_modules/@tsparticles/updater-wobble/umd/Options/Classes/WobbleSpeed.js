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
    exports.WobbleSpeed = void 0;
    const engine_1 = require("@tsparticles/engine");
    class WobbleSpeed {
        constructor() {
            this.angle = 50;
            this.move = 10;
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            if (data.angle !== undefined) {
                this.angle = (0, engine_1.setRangeValue)(data.angle);
            }
            if (data.move !== undefined) {
                this.move = (0, engine_1.setRangeValue)(data.move);
            }
        }
    }
    exports.WobbleSpeed = WobbleSpeed;
});
