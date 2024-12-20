(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./Utils.js", "./Options/Classes/Attract.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Attractor = void 0;
    const engine_1 = require("@tsparticles/engine");
    const Utils_js_1 = require("./Utils.js");
    const Attract_js_1 = require("./Options/Classes/Attract.js");
    const attractMode = "attract";
    class Attractor extends engine_1.ExternalInteractorBase {
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
                }, attract.duration * engine_1.millisecondsToSeconds);
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
            const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === engine_1.mouseMoveEvent, events = options.interactivity.events, { enable: hoverEnabled, mode: hoverMode } = events.onHover, { enable: clickEnabled, mode: clickMode } = events.onClick;
            if (mouseMoveStatus && hoverEnabled && (0, engine_1.isInArray)(attractMode, hoverMode)) {
                (0, Utils_js_1.hoverAttract)(this._engine, this.container, p => this.isEnabled(p));
            }
            else if (clickEnabled && (0, engine_1.isInArray)(attractMode, clickMode)) {
                (0, Utils_js_1.clickAttract)(this._engine, this.container, p => this.isEnabled(p));
            }
        }
        isEnabled(particle) {
            const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? options.interactivity).events;
            if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
                return false;
            }
            const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
            return (0, engine_1.isInArray)(attractMode, hoverMode) || (0, engine_1.isInArray)(attractMode, clickMode);
        }
        loadModeOptions(options, ...sources) {
            if (!options.attract) {
                options.attract = new Attract_js_1.Attract();
            }
            for (const source of sources) {
                options.attract.load(source?.attract);
            }
        }
        reset() {
        }
    }
    exports.Attractor = Attractor;
});
