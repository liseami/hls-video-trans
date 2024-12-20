(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./RotateAnimation.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Rotate = void 0;
    const engine_1 = require("@tsparticles/engine");
    const RotateAnimation_js_1 = require("./RotateAnimation.js");
    class Rotate extends engine_1.ValueWithRandom {
        constructor() {
            super();
            this.animation = new RotateAnimation_js_1.RotateAnimation();
            this.direction = engine_1.RotateDirection.clockwise;
            this.path = false;
            this.value = 0;
        }
        load(data) {
            if ((0, engine_1.isNull)(data)) {
                return;
            }
            super.load(data);
            if (data.direction !== undefined) {
                this.direction = data.direction;
            }
            this.animation.load(data.animation);
            if (data.path !== undefined) {
                this.path = data.path;
            }
        }
    }
    exports.Rotate = Rotate;
});
