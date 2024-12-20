"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collider = void 0;
const engine_1 = require("@tsparticles/engine");
const ResolveCollision_js_1 = require("./ResolveCollision.js");
const double = 2;
class Collider extends engine_1.ParticlesInteractorBase {
    constructor(container) {
        super(container);
    }
    clear() {
    }
    init() {
    }
    interact(p1, delta) {
        if (p1.destroyed || p1.spawning) {
            return;
        }
        const container = this.container, pos1 = p1.getPosition(), radius1 = p1.getRadius(), query = container.particles.quadTree.queryCircle(pos1, radius1 * double);
        for (const p2 of query) {
            if (p1 === p2 ||
                !p2.options.collisions.enable ||
                p1.options.collisions.mode !== p2.options.collisions.mode ||
                p2.destroyed ||
                p2.spawning) {
                continue;
            }
            const pos2 = p2.getPosition(), radius2 = p2.getRadius();
            if (Math.abs(Math.round(pos1.z) - Math.round(pos2.z)) > radius1 + radius2) {
                continue;
            }
            const dist = (0, engine_1.getDistance)(pos1, pos2), distP = radius1 + radius2;
            if (dist > distP) {
                continue;
            }
            (0, ResolveCollision_js_1.resolveCollision)(p1, p2, delta, container.retina.pixelRatio);
        }
    }
    isEnabled(particle) {
        return particle.options.collisions.enable;
    }
    reset() {
    }
}
exports.Collider = Collider;
