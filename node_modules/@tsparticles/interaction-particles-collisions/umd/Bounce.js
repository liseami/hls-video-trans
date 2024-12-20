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
    exports.bounce = bounce;
    const engine_1 = require("@tsparticles/engine");
    const fixBounceSpeed = (p) => {
        if (p.collisionMaxSpeed === undefined) {
            p.collisionMaxSpeed = (0, engine_1.getRangeValue)(p.options.collisions.maxSpeed);
        }
        if (p.velocity.length > p.collisionMaxSpeed) {
            p.velocity.length = p.collisionMaxSpeed;
        }
    };
    function bounce(p1, p2) {
        (0, engine_1.circleBounce)((0, engine_1.circleBounceDataFromParticle)(p1), (0, engine_1.circleBounceDataFromParticle)(p2));
        fixBounceSpeed(p1);
        fixBounceSpeed(p2);
    }
});
