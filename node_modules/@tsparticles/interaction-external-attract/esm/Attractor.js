import { ExternalInteractorBase, isInArray, millisecondsToSeconds, mouseMoveEvent, } from "@tsparticles/engine";
import { clickAttract, hoverAttract } from "./Utils.js";
import { Attract } from "./Options/Classes/Attract.js";
const attractMode = "attract";
export class Attractor extends ExternalInteractorBase {
    constructor(engine, container) {
        super(container);
        this._engine = engine;
        if (!container.attract) {
            container.attract = { particles: [] };
        }
        this.handleClickMode = (mode) => {
            const options = this.container.actualOptions, attract = options.interactivity.modes.attract;
            if (!attract || mode !== attractMode) {
                return;
            }
            if (!container.attract) {
                container.attract = { particles: [] };
            }
            container.attract.clicking = true;
            container.attract.count = 0;
            for (const particle of container.attract.particles) {
                if (!this.isEnabled(particle)) {
                    continue;
                }
                particle.velocity.setTo(particle.initialVelocity);
            }
            container.attract.particles = [];
            container.attract.finish = false;
            setTimeout(() => {
                if (container.destroyed) {
                    return;
                }
                if (!container.attract) {
                    container.attract = { particles: [] };
                }
                container.attract.clicking = false;
            }, attract.duration * millisecondsToSeconds);
        };
    }
    clear() {
    }
    init() {
        const container = this.container, attract = container.actualOptions.interactivity.modes.attract;
        if (!attract) {
            return;
        }
        container.retina.attractModeDistance = attract.distance * container.retina.pixelRatio;
    }
    interact() {
        const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === mouseMoveEvent, events = options.interactivity.events, { enable: hoverEnabled, mode: hoverMode } = events.onHover, { enable: clickEnabled, mode: clickMode } = events.onClick;
        if (mouseMoveStatus && hoverEnabled && isInArray(attractMode, hoverMode)) {
            hoverAttract(this._engine, this.container, p => this.isEnabled(p));
        }
        else if (clickEnabled && isInArray(attractMode, clickMode)) {
            clickAttract(this._engine, this.container, p => this.isEnabled(p));
        }
    }
    isEnabled(particle) {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? options.interactivity).events;
        if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
            return false;
        }
        const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
        return isInArray(attractMode, hoverMode) || isInArray(attractMode, clickMode);
    }
    loadModeOptions(options, ...sources) {
        if (!options.attract) {
            options.attract = new Attract();
        }
        for (const source of sources) {
            options.attract.load(source?.attract);
        }
    }
    reset() {
    }
}
