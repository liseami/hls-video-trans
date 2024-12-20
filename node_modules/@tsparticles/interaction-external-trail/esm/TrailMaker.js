import { ExternalInteractorBase, isInArray, millisecondsToSeconds, } from "@tsparticles/engine";
import { Trail } from "./Options/Classes/Trail.js";
const trailMode = "trail";
export class TrailMaker extends ExternalInteractorBase {
    constructor(container) {
        super(container);
        this._delay = 0;
    }
    clear() {
    }
    init() {
    }
    interact(delta) {
        const container = this.container, { interactivity } = container;
        if (!container.retina.reduceFactor) {
            return;
        }
        const options = container.actualOptions, trailOptions = options.interactivity.modes.trail;
        if (!trailOptions) {
            return;
        }
        const optDelay = (trailOptions.delay * millisecondsToSeconds) / this.container.retina.reduceFactor;
        if (this._delay < optDelay) {
            this._delay += delta.value;
        }
        if (this._delay < optDelay) {
            return;
        }
        const canEmit = !(trailOptions.pauseOnStop &&
            (interactivity.mouse.position === this._lastPosition ||
                (interactivity.mouse.position?.x === this._lastPosition?.x &&
                    interactivity.mouse.position?.y === this._lastPosition?.y)));
        const mousePos = container.interactivity.mouse.position;
        if (mousePos) {
            this._lastPosition = { ...mousePos };
        }
        else {
            delete this._lastPosition;
        }
        if (canEmit) {
            container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
        }
        this._delay -= optDelay;
    }
    isEnabled(particle) {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? options.interactivity).events;
        return ((mouse.clicking && mouse.inside && !!mouse.position && isInArray(trailMode, events.onClick.mode)) ||
            (mouse.inside && !!mouse.position && isInArray(trailMode, events.onHover.mode)));
    }
    loadModeOptions(options, ...sources) {
        if (!options.trail) {
            options.trail = new Trail();
        }
        for (const source of sources) {
            options.trail.load(source?.trail);
        }
    }
    reset() {
    }
}
