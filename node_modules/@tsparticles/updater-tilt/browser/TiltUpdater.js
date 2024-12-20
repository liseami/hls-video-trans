import { AnimationStatus, DestroyType, degToRad, getRandom, getRangeValue, halfRandom, updateAnimation, } from "@tsparticles/engine";
import { Tilt } from "./Options/Classes/Tilt.js";
import { TiltDirection } from "./TiltDirection.js";
const identity = 1, double = 2, doublePI = Math.PI * double, maxAngle = 360;
export class TiltUpdater {
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
            value: degToRad(getRangeValue(tiltOptions.value)),
            sinDirection: getRandom() >= halfRandom ? identity : -identity,
            cosDirection: getRandom() >= halfRandom ? identity : -identity,
            min: 0,
            max: doublePI,
        };
        let tiltDirection = tiltOptions.direction;
        if (tiltDirection === TiltDirection.random) {
            const index = Math.floor(getRandom() * double), minIndex = 0;
            tiltDirection = index > minIndex ? TiltDirection.counterClockwise : TiltDirection.clockwise;
        }
        switch (tiltDirection) {
            case TiltDirection.counterClockwise:
            case "counterClockwise":
                particle.tilt.status = AnimationStatus.decreasing;
                break;
            case TiltDirection.clockwise:
                particle.tilt.status = AnimationStatus.increasing;
                break;
        }
        const tiltAnimation = particle.options.tilt?.animation;
        if (tiltAnimation?.enable) {
            particle.tilt.decay = identity - getRangeValue(tiltAnimation.decay);
            particle.tilt.velocity =
                (getRangeValue(tiltAnimation.speed) / maxAngle) * this.container.retina.reduceFactor;
            if (!tiltAnimation.sync) {
                particle.tilt.velocity *= getRandom();
            }
        }
    }
    isEnabled(particle) {
        const tiltAnimation = particle.options.tilt?.animation;
        return !particle.destroyed && !particle.spawning && !!tiltAnimation?.enable;
    }
    loadOptions(options, ...sources) {
        if (!options.tilt) {
            options.tilt = new Tilt();
        }
        for (const source of sources) {
            options.tilt.load(source?.tilt);
        }
    }
    async update(particle, delta) {
        if (!this.isEnabled(particle) || !particle.tilt) {
            return;
        }
        updateAnimation(particle, particle.tilt, false, DestroyType.none, delta);
        await Promise.resolve();
    }
}
