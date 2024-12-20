(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./Options/Classes/Grab.js", "./Utils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Grabber = void 0;
    const engine_1 = require("@tsparticles/engine");
    const Grab_js_1 = require("./Options/Classes/Grab.js");
    const Utils_js_1 = require("./Utils.js");
    const grabMode = "grab", minDistance = 0, minOpacity = 0;
    class Grabber extends engine_1.ExternalInteractorBase {
        constructor(container, engine) {
            super(container);
            this._engine = engine;
        }
        clear() {
        }
        init() {
            const container = this.container, grab = container.actualOptions.interactivity.modes.grab;
            if (!grab) {
                return;
            }
            container.retina.grabModeDistance = grab.distance * container.retina.pixelRatio;
        }
        interact() {
            const container = this.container, options = container.actualOptions, interactivity = options.interactivity;
            if (!interactivity.modes.grab ||
                !interactivity.events.onHover.enable ||
                container.interactivity.status !== engine_1.mouseMoveEvent) {
                return;
            }
            const mousePos = container.interactivity.mouse.position;
            if (!mousePos) {
                return;
            }
            const distance = container.retina.grabModeDistance;
            if (!distance || distance < minDistance) {
                return;
            }
            const query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));
            for (const particle of query) {
                const pos = particle.getPosition(), pointDistance = (0, engine_1.getDistance)(pos, mousePos);
                if (pointDistance > distance) {
                    continue;
                }
                const grabLineOptions = interactivity.modes.grab.links, lineOpacity = grabLineOptions.opacity, opacityLine = lineOpacity - (pointDistance * lineOpacity) / distance;
                if (opacityLine <= minOpacity) {
                    continue;
                }
                const optColor = grabLineOptions.color ?? particle.options.links?.color;
                if (!container.particles.grabLineColor && optColor) {
                    const linksOptions = interactivity.modes.grab.links;
                    container.particles.grabLineColor = (0, engine_1.getLinkRandomColor)(this._engine, optColor, linksOptions.blink, linksOptions.consent);
                }
                const colorLine = (0, engine_1.getLinkColor)(particle, undefined, container.particles.grabLineColor);
                if (!colorLine) {
                    continue;
                }
                (0, Utils_js_1.drawGrab)(container, particle, colorLine, opacityLine, mousePos);
            }
        }
        isEnabled(particle) {
            const container = this.container, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? container.actualOptions.interactivity).events;
            return events.onHover.enable && !!mouse.position && (0, engine_1.isInArray)(grabMode, events.onHover.mode);
        }
        loadModeOptions(options, ...sources) {
            if (!options.grab) {
                options.grab = new Grab_js_1.Grab();
            }
            for (const source of sources) {
                options.grab.load(source?.grab);
            }
        }
        reset() {
        }
    }
    exports.Grabber = Grabber;
});
