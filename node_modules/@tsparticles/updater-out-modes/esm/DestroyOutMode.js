import { OutMode, ParticleOutType, Vector, getDistances, isPointInside, } from "@tsparticles/engine";
const minVelocity = 0;
export class DestroyOutMode {
    constructor(container) {
        this.container = container;
        this.modes = [OutMode.destroy];
    }
    update(particle, direction, _delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        const container = this.container;
        switch (particle.outType) {
            case ParticleOutType.normal:
            case ParticleOutType.outside:
                if (isPointInside(particle.position, container.canvas.size, Vector.origin, particle.getRadius(), direction)) {
                    return;
                }
                break;
            case ParticleOutType.inside: {
                const { dx, dy } = getDistances(particle.position, particle.moveCenter), { x: vx, y: vy } = particle.velocity;
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
