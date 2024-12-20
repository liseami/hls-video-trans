import { millisecondsToSeconds } from "@tsparticles/engine";
const defaultDistance = 0, double = 2, doublePI = Math.PI * double, distanceFactor = 60;
export function updateWobble(particle, delta) {
    const { wobble: wobbleOptions } = particle.options, { wobble } = particle;
    if (!wobbleOptions?.enable || !wobble) {
        return;
    }
    const angleSpeed = wobble.angleSpeed * delta.factor, moveSpeed = wobble.moveSpeed * delta.factor, distance = (moveSpeed * ((particle.retina.wobbleDistance ?? defaultDistance) * delta.factor)) /
        (millisecondsToSeconds / distanceFactor), max = doublePI, { position } = particle;
    wobble.angle += angleSpeed;
    if (wobble.angle > max) {
        wobble.angle -= max;
    }
    position.x += distance * Math.cos(wobble.angle);
    position.y += distance * Math.abs(Math.sin(wobble.angle));
}
