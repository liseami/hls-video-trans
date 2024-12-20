"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMover = void 0;
const engine_1 = require("@tsparticles/engine");
const Utils_js_1 = require("./Utils.js");
const diffFactor = 2, defaultSizeFactor = 1, defaultDeltaFactor = 1;
class BaseMover {
    init(particle) {
        const options = particle.options, gravityOptions = options.move.gravity;
        particle.gravity = {
            enable: gravityOptions.enable,
            acceleration: (0, engine_1.getRangeValue)(gravityOptions.acceleration),
            inverse: gravityOptions.inverse,
        };
        (0, Utils_js_1.initSpin)(particle);
    }
    isEnabled(particle) {
        return !particle.destroyed && particle.options.move.enable;
    }
    move(particle, delta) {
        const particleOptions = particle.options, moveOptions = particleOptions.move;
        if (!moveOptions.enable) {
            return;
        }
        const container = particle.container, pxRatio = container.retina.pixelRatio;
        particle.retina.moveSpeed ??= (0, engine_1.getRangeValue)(moveOptions.speed) * pxRatio;
        particle.retina.moveDrift ??= (0, engine_1.getRangeValue)(particle.options.move.drift) * pxRatio;
        const slowFactor = (0, Utils_js_1.getProximitySpeedFactor)(particle), baseSpeed = particle.retina.moveSpeed * container.retina.reduceFactor, moveDrift = particle.retina.moveDrift, maxSize = (0, engine_1.getRangeMax)(particleOptions.size.value) * pxRatio, sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : defaultSizeFactor, deltaFactor = delta.factor || defaultDeltaFactor, moveSpeed = (baseSpeed * sizeFactor * slowFactor * deltaFactor) / diffFactor, maxSpeed = particle.retina.maxSpeed ?? container.retina.maxSpeed;
        if (moveOptions.spin.enable) {
            (0, Utils_js_1.spin)(particle, moveSpeed);
        }
        else {
            (0, Utils_js_1.move)(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta);
        }
        (0, Utils_js_1.applyDistance)(particle);
    }
}
exports.BaseMover = BaseMover;
