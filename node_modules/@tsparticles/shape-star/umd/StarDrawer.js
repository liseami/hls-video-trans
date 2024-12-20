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
    exports.StarDrawer = void 0;
    const engine_1 = require("@tsparticles/engine");
    const Utils_js_1 = require("./Utils.js");
    const defaultInset = 2, defaultSides = 5;
    class StarDrawer {
        constructor() {
            this.validTypes = ["star"];
        }
        draw(data) {
            (0, Utils_js_1.drawStar)(data);
        }
        getSidesCount(particle) {
            const star = particle.shapeData;
            return Math.round((0, engine_1.getRangeValue)(star?.sides ?? defaultSides));
        }
        particleInit(container, particle) {
            const star = particle.shapeData;
            particle.starInset = (0, engine_1.getRangeValue)(star?.inset ?? defaultInset);
        }
    }
    exports.StarDrawer = StarDrawer;
});
