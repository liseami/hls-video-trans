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
    exports.RepulseBase = void 0;
    const engine_1 = require("@tsparticles/engine");
    class RepulseBase {
        constructor() {
            this.distance = 200;
            this.duration = 0.4;
            this.factor = 100;
            this.speed = 1;
            this.maxSpeed = 50;
            this.easing = engine_1.EasingType.easeOutQuad;
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }
            if (data.duration !== undefined) {
                this.duration = data.duration;
            }
            if (data.easing !== undefined) {
                this.easing = data.easing;
            }
            if (data.factor !== undefined) {
                this.factor = data.factor;
            }
            if (data.speed !== undefined) {
                this.speed = data.speed;
            }
            if (data.maxSpeed !== undefined) {
                this.maxSpeed = data.maxSpeed;
            }
        }
    }
    exports.RepulseBase = RepulseBase;
});
