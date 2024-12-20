"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slower = void 0;
const engine_1 = require("@tsparticles/engine");
const Slow_js_1 = require("./Options/Classes/Slow.js");
const slowMode = "slow", minRadius = 0;
class Slower extends engine_1.ExternalInteractorBase {
    constructor(container) {
        super(container);
    }
    clear(particle, delta, force) {
        if (particle.slow.inRange && !force) {
            return;
        }
        particle.slow.factor = 1;
    }
    init() {
        const container = this.container, slow = container.actualOptions.interactivity.modes.slow;
        if (!slow) {
            return;
        }
        container.retina.slowModeRadius = slow.radius * container.retina.pixelRatio;
    }
    interact() {
    }
    isEnabled(particle) {
        const container = this.container, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? container.actualOptions.interactivity).events;
        return events.onHover.enable && !!mouse.position && (0, engine_1.isInArray)(slowMode, events.onHover.mode);
    }
    loadModeOptions(options, ...sources) {
        if (!options.slow) {
            options.slow = new Slow_js_1.Slow();
        }
        for (const source of sources) {
            options.slow.load(source?.slow);
        }
    }
    reset(particle) {
        particle.slow.inRange = false;
        const container = this.container, options = container.actualOptions, mousePos = container.interactivity.mouse.position, radius = container.retina.slowModeRadius, slowOptions = options.interactivity.modes.slow;
        if (!slowOptions || !radius || radius < minRadius || !mousePos) {
            return;
        }
        const particlePos = particle.getPosition(), dist = (0, engine_1.getDistance)(mousePos, particlePos), proximityFactor = dist / radius, slowFactor = slowOptions.factor, { slow } = particle;
        if (dist > radius) {
            return;
        }
        slow.inRange = true;
        slow.factor = proximityFactor / slowFactor;
    }
}
exports.Slower = Slower;
