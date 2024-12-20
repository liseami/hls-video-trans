import { OutMode, OutModeDirection, Vector, isPointInside, } from "@tsparticles/engine";
const minVelocity = 0;
export class NoneOutMode {
    constructor(container) {
        this.container = container;
        this.modes = [OutMode.none];
    }
    update(particle, direction, delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        if ((particle.options.move.distance.horizontal &&
            (direction === OutModeDirection.left || direction === OutModeDirection.right)) ??
            (particle.options.move.distance.vertical &&
                (direction === OutModeDirection.top || direction === OutModeDirection.bottom))) {
            return;
        }
        const gravityOptions = particle.options.move.gravity, container = this.container, canvasSize = container.canvas.size, pRadius = particle.getRadius();
        if (!gravityOptions.enable) {
            if ((particle.velocity.y > minVelocity && particle.position.y <= canvasSize.height + pRadius) ||
                (particle.velocity.y < minVelocity && particle.position.y >= -pRadius) ||
                (particle.velocity.x > minVelocity && particle.position.x <= canvasSize.width + pRadius) ||
                (particle.velocity.x < minVelocity && particle.position.x >= -pRadius)) {
                return;
            }
            if (!isPointInside(particle.position, container.canvas.size, Vector.origin, pRadius, direction)) {
                container.particles.remove(particle);
            }
        }
        else {
            const position = particle.position;
            if ((!gravityOptions.inverse &&
                position.y > canvasSize.height + pRadius &&
                direction === OutModeDirection.bottom) ||
                (gravityOptions.inverse && position.y < -pRadius && direction === OutModeDirection.top)) {
                container.particles.remove(particle);
            }
        }
    }
}
