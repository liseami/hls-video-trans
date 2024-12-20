"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bouncer = void 0;
const engine_1 = require("@tsparticles/engine");
const Utils_js_1 = require("./Utils.js");
const Bounce_js_1 = require("./Options/Classes/Bounce.js");
const bounceMode = "bounce";
class Bouncer extends engine_1.ExternalInteractorBase {
    constructor(container) {
        super(container);
    }
    clear() {
    }
    init() {
        const container = this.container, bounce = container.actualOptions.interactivity.modes.bounce;
        if (!bounce) {
            return;
        }
        container.retina.bounceModeDistance = bounce.distance * container.retina.pixelRatio;
    }
    interact() {
        const container = this.container, options = container.actualOptions, events = options.interactivity.events, mouseMoveStatus = container.interactivity.status === engine_1.mouseMoveEvent, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && (0, engine_1.isInArray)(bounceMode, hoverMode)) {
            (0, Utils_js_1.mouseBounce)(this.container, p => this.isEnabled(p));
        }
        else {
            (0, Utils_js_1.divBounce)(this.container, divs, bounceMode, p => this.isEnabled(p));
        }
    }
    isEnabled(particle) {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? options.interactivity).events, divs = events.onDiv;
        return ((!!mouse.position && events.onHover.enable && (0, engine_1.isInArray)(bounceMode, events.onHover.mode)) ||
            (0, engine_1.isDivModeEnabled)(bounceMode, divs));
    }
    loadModeOptions(options, ...sources) {
        if (!options.bounce) {
            options.bounce = new Bounce_js_1.Bounce();
        }
        for (const source of sources) {
            options.bounce.load(source?.bounce);
        }
    }
    reset() {
    }
}
exports.Bouncer = Bouncer;
