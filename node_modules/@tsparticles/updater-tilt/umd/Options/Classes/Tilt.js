(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "../../TiltDirection.js", "./TiltAnimation.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tilt = void 0;
    const engine_1 = require("@tsparticles/engine");
    const TiltDirection_js_1 = require("../../TiltDirection.js");
    const TiltAnimation_js_1 = require("./TiltAnimation.js");
    class Tilt extends engine_1.ValueWithRandom {
        constructor() {
            super();
            this.animation = new TiltAnimation_js_1.TiltAnimation();
            this.direction = TiltDirection_js_1.TiltDirection.clockwise;
            this.enable = false;
            this.value = 0;
        }
        load(data) {
            super.load(data);
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            this.animation.load(data.animation);
            if (data.direction !== undefined) {
                this.direction = data.direction;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
        }
    }
    exports.Tilt = Tilt;
});
