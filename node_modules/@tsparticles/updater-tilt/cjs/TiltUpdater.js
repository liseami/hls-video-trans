"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiltUpdater = void 0;
const engine_1 = require("@tsparticles/engine");
const Tilt_js_1 = require("./Options/Classes/Tilt.js");
const TiltDirection_js_1 = require("./TiltDirection.js");
const identity = 1, double = 2, doublePI = Math.PI * double, maxAngle = 360;
class TiltUpdater {
    constructor(container) {
        this.container = container;
    }
    getTransformValues(particle) {
        const tilt = particle.tilt?.enable && particle.tilt;
        return {
            b: tilt ? Math.cos(tilt.value) * tilt.cosDirection : undefined,
            c: tilt ? Math.sin(tilt.value) * tilt.sinDirection : undefined,
        };
    }
    init(particle) {
        const tiltOptions = particle.options.tilt;
        if (!tiltOptions) {
            return;
        }
        particle.tilt = {
            enable: tiltOptions.enable,
            value: (0, engine_1.degToRad)((0, engine_1.getRangeValue)(tiltOptions.value)),
            sinDirection: (0, engine_1.getRandom)() >= engine_1.halfRandom ? identity : -identity,
            cosDirection: (0, engine_1.getRandom)() >= engine_1.halfRandom ? identity : -identity,
            min: 0,
            max: doublePI,
        };
        let tiltDirection = tiltOptions.direction;
        if (tiltDirection === TiltDirection_js_1.TiltDirection.random) {
            const index = Math.floor((0, engine_1.getRandom)() * double), minIndex = 0;
            tiltDirection = index > minIndex ? TiltDirection_js_1.TiltDirection.counterClockwise : TiltDirection_js_1.TiltDirection.clockwise;
        }
        switch (tiltDirection) {
            case TiltDirection_js_1.TiltDirection.counterClockwise:
            case "counterClockwise":
                particle.tilt.status = engine_1.AnimationStatus.decreasing;
                break;
            case TiltDirection_js_1.TiltDirection.clockwise:
                particle.tilt.status = engine_1.AnimationStatus.increasing;
                break;
        }
        const tiltAnimation = particle.options.tilt?.animation;
        if (tiltAnimation?.enable) {
            particle.tilt.decay = identity - (0, engine_1.getRangeValue)(tiltAnimation.decay);
            particle.tilt.velocity =
                ((0, engine_1.getRangeValue)(tiltAnimation.speed) / maxAngle) * this.container.retina.reduceFactor;
            if (!tiltAnimation.sync) {
                particle.tilt.velocity *= (0, engine_1.getRandom)();
            }
        }
    }
    isEnabled(particle) {
        const tiltAnimation = particle.options.tilt?.animation;
        return !particle.destroyed && !particle.spawning && !!tiltAnimation?.enable;
    }
    loadOptions(options, ...sources) {
        if (!options.tilt) {
            options.tilt = new Tilt_js_1.Tilt();
        }
        for (const source of sources) {
            options.tilt.load(source?.tilt);
        }
    }
    async update(particle, delta) {
        if (!this.isEnabled(particle) || !particle.tilt) {
            return;
        }
        (0, engine_1.updateAnimation)(particle, particle.tilt, false, engine_1.DestroyType.none, delta);
        await Promise.resolve();
    }
}
exports.TiltUpdater = TiltUpdater;
