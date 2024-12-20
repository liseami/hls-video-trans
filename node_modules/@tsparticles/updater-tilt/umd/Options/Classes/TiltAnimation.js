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
    exports.TiltAnimation = void 0;
    const engine_1 = require("@tsparticles/engine");
    class TiltAnimation {
        constructor() {
            this.enable = false;
            this.speed = 0;
            this.decay = 0;
            this.sync = false;
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.speed !== undefined) {
                this.speed = (0, engine_1.setRangeValue)(data.speed);
            }
            if (data.decay !== undefined) {
                this.decay = (0, engine_1.setRangeValue)(data.decay);
            }
            if (data.sync !== undefined) {
                this.sync = data.sync;
            }
        }
    }
    exports.TiltAnimation = TiltAnimation;
});
