"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WobbleUpdater = void 0;
const engine_1 = require("@tsparticles/engine");
const Wobble_js_1 = require("./Options/Classes/Wobble.js");
const Utils_js_1 = require("./Utils.js");
const double = 2, doublePI = Math.PI * double, maxAngle = 360, moveSpeedFactor = 10, defaultDistance = 0;
class WobbleUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const wobbleOpt = particle.options.wobble;
        if (wobbleOpt?.enable) {
            particle.wobble = {
                angle: (0, engine_1.getRandom)() * doublePI,
                angleSpeed: (0, engine_1.getRangeValue)(wobbleOpt.speed.angle) / maxAngle,
                moveSpeed: (0, engine_1.getRangeValue)(wobbleOpt.speed.move) / moveSpeedFactor,
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
            (0, engine_1.getRangeValue)(wobbleOpt?.distance ?? defaultDistance) * this.container.retina.pixelRatio;
    }
    isEnabled(particle) {
        return !particle.destroyed && !particle.spawning && !!particle.options.wobble?.enable;
    }
    loadOptions(options, ...sources) {
        if (!options.wobble) {
            options.wobble = new Wobble_js_1.Wobble();
        }
        for (const source of sources) {
            options.wobble.load(source?.wobble);
        }
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        (0, Utils_js_1.updateWobble)(particle, delta);
    }
}
exports.WobbleUpdater = WobbleUpdater;
