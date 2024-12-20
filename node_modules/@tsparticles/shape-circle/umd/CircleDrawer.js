(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./Utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CircleDrawer = void 0;
    const engine_1 = require("@tsparticles/engine");
    const Utils_js_1 = require("./Utils.js");
    const sides = 12, maxAngle = 360, minAngle = 0;
    class CircleDrawer {
        constructor() {
            this.validTypes = ["circle"];
        }
        draw(data) {
            (0, Utils_js_1.drawCircle)(data);
        }
        getSidesCount() {
            return sides;
        }
        particleInit(container, particle) {
            const shapeData = particle.shapeData, angle = shapeData?.angle ?? {
                max: maxAngle,
                min: minAngle,
            };
            particle.circleRange = !(0, engine_1.isObject)(angle)
                ? {
                    min: minAngle,
                    max: (0, engine_1.degToRad)(angle),
                }
                : { min: (0, engine_1.degToRad)(angle.min), max: (0, engine_1.degToRad)(angle.max) };
        }
    }
    exports.CircleDrawer = CircleDrawer;
});
