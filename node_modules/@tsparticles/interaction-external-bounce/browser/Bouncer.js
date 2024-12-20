import { ExternalInteractorBase, isDivModeEnabled, isInArray, mouseMoveEvent, } from "@tsparticles/engine";
import { divBounce, mouseBounce } from "./Utils.js";
import { Bounce } from "./Options/Classes/Bounce.js";
const bounceMode = "bounce";
export class Bouncer extends ExternalInteractorBase {
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
        const container = this.container, options = container.actualOptions, events = options.interactivity.events, mouseMoveStatus = container.interactivity.status === mouseMoveEvent, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && isInArray(bounceMode, hoverMode)) {
            mouseBounce(this.container, p => this.isEnabled(p));
        }
        else {
            divBounce(this.container, divs, bounceMode, p => this.isEnabled(p));
        }
    }
    isEnabled(particle) {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? options.interactivity).events, divs = events.onDiv;
        return ((!!mouse.position && events.onHover.enable && isInArray(bounceMode, events.onHover.mode)) ||
            isDivModeEnabled(bounceMode, divs));
    }
    loadModeOptions(options, ...sources) {
        if (!options.bounce) {
            options.bounce = new Bounce();
        }
        for (const source of sources) {
            options.bounce.load(source?.bounce);
        }
    }
    reset() {
    }
}
