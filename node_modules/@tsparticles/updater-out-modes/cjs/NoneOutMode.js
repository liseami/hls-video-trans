"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoneOutMode = void 0;
const engine_1 = require("@tsparticles/engine");
const minVelocity = 0;
class NoneOutMode {
    constructor(container) {
        this.container = container;
        this.modes = [engine_1.OutMode.none];
    }
    update(particle, direction, delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        if ((particle.options.move.distance.horizontal &&
            (direction === engine_1.OutModeDirection.left || direction === engine_1.OutModeDirection.right)) ??
            (particle.options.move.distance.vertical &&
                (direction === engine_1.OutModeDirection.top || direction === engine_1.OutModeDirection.bottom))) {
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
            if (!(0, engine_1.isPointInside)(particle.position, container.canvas.size, engine_1.Vector.origin, pRadius, direction)) {
                container.particles.remove(particle);
            }
        }
        else {
            const position = particle.position;
            if ((!gravityOptions.inverse &&
                position.y > canvasSize.height + pRadius &&
                direction === engine_1.OutModeDirection.bottom) ||
                (gravityOptions.inverse && position.y < -pRadius && direction === engine_1.OutModeDirection.top)) {
                container.particles.remove(particle);
            }
        }
    }
}
exports.NoneOutMode = NoneOutMode;
