"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attractor = void 0;
const engine_1 = require("@tsparticles/engine");
const attractFactor = 1000, identity = 1;
class Attractor extends engine_1.ParticlesInteractorBase {
    constructor(container) {
        super(container);
    }
    clear() {
    }
    init() {
    }
    interact(p1) {
        const container = this.container;
        if (p1.attractDistance === undefined) {
            p1.attractDistance = (0, engine_1.getRangeValue)(p1.options.move.attract.distance) * container.retina.pixelRatio;
        }
        const distance = p1.attractDistance, pos1 = p1.getPosition(), query = container.particles.quadTree.queryCircle(pos1, distance);
        for (const p2 of query) {
            if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
                continue;
            }
            const pos2 = p2.getPosition(), { dx, dy } = (0, engine_1.getDistances)(pos1, pos2), rotate = p1.options.move.attract.rotate, ax = dx / (rotate.x * attractFactor), ay = dy / (rotate.y * attractFactor), p1Factor = p2.size.value / p1.size.value, p2Factor = identity / p1Factor;
            p1.velocity.x -= ax * p1Factor;
            p1.velocity.y -= ay * p1Factor;
            p2.velocity.x += ax * p2Factor;
            p2.velocity.y += ay * p2Factor;
        }
    }
    isEnabled(particle) {
        return particle.options.move.attract.enable;
    }
    reset() {
    }
}
exports.Attractor = Attractor;
