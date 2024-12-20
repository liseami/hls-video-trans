import { getRandom, getRangeValue, } from "@tsparticles/engine";
import { Wobble } from "./Options/Classes/Wobble.js";
import { updateWobble } from "./Utils.js";
const double = 2, doublePI = Math.PI * double, maxAngle = 360, moveSpeedFactor = 10, defaultDistance = 0;
export class WobbleUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const wobbleOpt = particle.options.wobble;
        if (wobbleOpt?.enable) {
            particle.wobble = {
                angle: getRandom() * doublePI,
                angleSpeed: getRangeValue(wobbleOpt.speed.angle) / maxAngle,
                moveSpeed: getRangeValue(wobbleOpt.speed.move) / moveSpeedFactor,
            };
        }
        else {
            particle.wobble = {
                angle: 0,
                angleSpeed: 0,
                moveSpeed: 0,
            };
        }
        particle.retina.wobbleDistance =
            getRangeValue(wobbleOpt?.distance ?? defaultDistance) * this.container.retina.pixelRatio;
    }
    isEnabled(particle) {
        return !particle.destroyed && !particle.spawning && !!particle.options.wobble?.enable;
    }
    loadOptions(options, ...sources) {
        if (!options.wobble) {
            options.wobble = new Wobble();
        }
        for (const source of sources) {
            options.wobble.load(source?.wobble);
        }
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateWobble(particle, delta);
    }
}
