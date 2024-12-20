"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWobble = updateWobble;
const engine_1 = require("@tsparticles/engine");
const defaultDistance = 0, double = 2, doublePI = Math.PI * double, distanceFactor = 60;
function updateWobble(particle, delta) {
    const { wobble: wobbleOptions } = particle.options, { wobble } = particle;
    if (!wobbleOptions?.enable || !wobble) {
        return;
    }
    const angleSpeed = wobble.angleSpeed * delta.factor, moveSpeed = wobble.moveSpeed * delta.factor, distance = (moveSpeed * ((particle.retina.wobbleDistance ?? defaultDistance) * delta.factor)) /
        (engine_1.millisecondsToSeconds / distanceFactor), max = doublePI, { position } = particle;
    wobble.angle += angleSpeed;
    if (wobble.angle > max) {
        wobble.angle -= max;
    }
    position.x += distance * Math.cos(wobble.angle);
    position.y += distance * Math.abs(Math.sin(wobble.angle));
}
