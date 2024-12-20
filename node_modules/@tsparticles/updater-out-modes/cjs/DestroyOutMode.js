"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestroyOutMode = void 0;
const engine_1 = require("@tsparticles/engine");
const minVelocity = 0;
class DestroyOutMode {
    constructor(container) {
        this.container = container;
        this.modes = [engine_1.OutMode.destroy];
    }
    update(particle, direction, _delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        const container = this.container;
        switch (particle.outType) {
            case engine_1.ParticleOutType.normal:
            case engine_1.ParticleOutType.outside:
                if ((0, engine_1.isPointInside)(particle.position, container.canvas.size, engine_1.Vector.origin, particle.getRadius(), direction)) {
                    return;
                }
                break;
            case engine_1.ParticleOutType.inside: {
                const { dx, dy } = (0, engine_1.getDistances)(particle.position, particle.moveCenter), { x: vx, y: vy } = particle.velocity;
                if ((vx < minVelocity && dx > particle.moveCenter.radius) ||
                    (vy < minVelocity && dy > particle.moveCenter.radius) ||
                    (vx >= minVelocity && dx < -particle.moveCenter.radius) ||
                    (vy >= minVelocity && dy < -particle.moveCenter.radius)) {
                    return;
                }
                break;
            }
        }
        container.particles.remove(particle, particle.group, true);
    }
}
exports.DestroyOutMode = DestroyOutMode;
