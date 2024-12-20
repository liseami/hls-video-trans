(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./Absorb.js", "./Bounce.js", "./Destroy.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resolveCollision = resolveCollision;
    const engine_1 = require("@tsparticles/engine");
    const Absorb_js_1 = require("./Absorb.js");
    const Bounce_js_1 = require("./Bounce.js");
    const Destroy_js_1 = require("./Destroy.js");
    function resolveCollision(p1, p2, delta, pixelRatio) {
        switch (p1.options.collisions.mode) {
            case engine_1.CollisionMode.absorb: {
                (0, Absorb_js_1.absorb)(p1, p2, delta, pixelRatio);
                break;
            }
            case engine_1.CollisionMode.bounce: {
                (0, Bounce_js_1.bounce)(p1, p2);
                break;
            }
            case engine_1.CollisionMode.destroy: {
                (0, Destroy_js_1.destroy)(p1, p2);
                break;
            }
        }
    }
});
