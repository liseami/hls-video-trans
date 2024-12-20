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
    exports.OutOutMode = void 0;
    const engine_1 = require("@tsparticles/engine");
    const minVelocity = 0, minDistance = 0;
    class OutOutMode {
        constructor(container) {
            this.container = container;
            this.modes = [engine_1.OutMode.out];
        }
        update(particle, direction, delta, outMode) {
            if (!this.modes.includes(outMode)) {
                return;
            }
            const container = this.container;
            switch (particle.outType) {
                case engine_1.ParticleOutType.inside: {
                    const { x: vx, y: vy } = particle.velocity;
                    const circVec = engine_1.Vector.origin;
                    circVec.length = particle.moveCenter.radius;
                    circVec.angle = particle.velocity.angle + Math.PI;
                    circVec.addTo(engine_1.Vector.create(particle.moveCenter));
                    const { dx, dy } = (0, engine_1.getDistances)(particle.position, circVec);
                    if ((vx <= minVelocity && dx >= minDistance) ||
                        (vy <= minVelocity && dy >= minDistance) ||
                        (vx >= minVelocity && dx <= minDistance) ||
                        (vy >= minVelocity && dy <= minDistance)) {
                        return;
                    }
                    particle.position.x = Math.floor((0, engine_1.randomInRange)({
                        min: 0,
                        max: container.canvas.size.width,
                    }));
                    particle.position.y = Math.floor((0, engine_1.randomInRange)({
                        min: 0,
                        max: container.canvas.size.height,
                    }));
                    const { dx: newDx, dy: newDy } = (0, engine_1.getDistances)(particle.position, particle.moveCenter);
                    particle.direction = Math.atan2(-newDy, -newDx);
                    particle.velocity.angle = particle.direction;
                    break;
                }
                default: {
                    if ((0, engine_1.isPointInside)(particle.position, container.canvas.size, engine_1.Vector.origin, particle.getRadius(), direction)) {
                        return;
                    }
                    switch (particle.outType) {
                        case engine_1.ParticleOutType.outside: {
                            particle.position.x =
                                Math.floor((0, engine_1.randomInRange)({
                                    min: -particle.moveCenter.radius,
                                    max: particle.moveCenter.radius,
                                })) + particle.moveCenter.x;
                            particle.position.y =
                                Math.floor((0, engine_1.randomInRange)({
                                    min: -particle.moveCenter.radius,
                                    max: particle.moveCenter.radius,
                                })) + particle.moveCenter.y;
                            const { dx, dy } = (0, engine_1.getDistances)(particle.position, particle.moveCenter);
                            if (particle.moveCenter.radius) {
                                particle.direction = Math.atan2(dy, dx);
                                particle.velocity.angle = particle.direction;
                            }
                            break;
                        }
                        case engine_1.ParticleOutType.normal: {
                            const warp = particle.options.move.warp, canvasSize = container.canvas.size, newPos = {
                                bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
                                left: -particle.getRadius() - particle.offset.x,
                                right: canvasSize.width + particle.getRadius() + particle.offset.x,
                                top: -particle.getRadius() - particle.offset.y,
                            }, sizeValue = particle.getRadius(), nextBounds = (0, engine_1.calculateBounds)(particle.position, sizeValue);
                            if (direction === engine_1.OutModeDirection.right &&
                                nextBounds.left > canvasSize.width + particle.offset.x) {
                                particle.position.x = newPos.left;
                                particle.initialPosition.x = particle.position.x;
                                if (!warp) {
                                    particle.position.y = (0, engine_1.getRandom)() * canvasSize.height;
                                    particle.initialPosition.y = particle.position.y;
                                }
                            }
                            else if (direction === engine_1.OutModeDirection.left && nextBounds.right < -particle.offset.x) {
                                particle.position.x = newPos.right;
                                particle.initialPosition.x = particle.position.x;
                                if (!warp) {
                                    particle.position.y = (0, engine_1.getRandom)() * canvasSize.height;
                                    particle.initialPosition.y = particle.position.y;
                                }
                            }
                            if (direction === engine_1.OutModeDirection.bottom &&
                                nextBounds.top > canvasSize.height + particle.offset.y) {
                                if (!warp) {
                                    particle.position.x = (0, engine_1.getRandom)() * canvasSize.width;
                                    particle.initialPosition.x = particle.position.x;
                                }
                                particle.position.y = newPos.top;
                                particle.initialPosition.y = particle.position.y;
                            }
                            else if (direction === engine_1.OutModeDirection.top && nextBounds.bottom < -particle.offset.y) {
                                if (!warp) {
                                    particle.position.x = (0, engine_1.getRandom)() * canvasSize.width;
                                    particle.initialPosition.x = particle.position.x;
                                }
                                particle.position.y = newPos.bottom;
                                particle.initialPosition.y = particle.position.y;
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }
    exports.OutOutMode = OutOutMode;
});
