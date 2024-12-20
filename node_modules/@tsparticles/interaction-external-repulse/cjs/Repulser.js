"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repulser = void 0;
const engine_1 = require("@tsparticles/engine");
const Repulse_js_1 = require("./Options/Classes/Repulse.js");
const repulseMode = "repulse", minDistance = 0, repulseRadiusFactor = 6, repulseRadiusPower = 3, squarePower = 2, minRadius = 0, minSpeed = 0, easingOffset = 1, half = 0.5;
class Repulser extends engine_1.ExternalInteractorBase {
    constructor(engine, container) {
        super(container);
        this._clickRepulse = () => {
            const container = this.container, repulseOptions = container.actualOptions.interactivity.modes.repulse;
            if (!repulseOptions) {
                return;
            }
            const repulse = container.repulse ?? { particles: [] };
            if (!repulse.finish) {
                if (!repulse.count) {
                    repulse.count = 0;
                }
                repulse.count++;
                if (repulse.count === container.particles.count) {
                    repulse.finish = true;
                }
            }
            if (repulse.clicking) {
                const repulseDistance = container.retina.repulseModeDistance;
                if (!repulseDistance || repulseDistance < minDistance) {
                    return;
                }
                const repulseRadius = Math.pow(repulseDistance / repulseRadiusFactor, repulseRadiusPower), mouseClickPos = container.interactivity.mouse.clickPosition;
                if (mouseClickPos === undefined) {
                    return;
                }
                const range = new engine_1.Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius), query = container.particles.quadTree.query(range, p => this.isEnabled(p));
                for (const particle of query) {
                    const { dx, dy, distance } = (0, engine_1.getDistances)(mouseClickPos, particle.position), d = distance ** squarePower, velocity = repulseOptions.speed, force = (-repulseRadius * velocity) / d;
                    if (d <= repulseRadius) {
                        repulse.particles.push(particle);
                        const vect = engine_1.Vector.create(dx, dy);
                        vect.length = force;
                        particle.velocity.setTo(vect);
                    }
                }
            }
            else if (repulse.clicking === false) {
                for (const particle of repulse.particles) {
                    particle.velocity.setTo(particle.initialVelocity);
                }
                repulse.particles = [];
            }
        };
        this._hoverRepulse = () => {
            const container = this.container, mousePos = container.interactivity.mouse.position, repulseRadius = container.retina.repulseModeDistance;
            if (!repulseRadius || repulseRadius < minRadius || !mousePos) {
                return;
            }
            this._processRepulse(mousePos, repulseRadius, new engine_1.Circle(mousePos.x, mousePos.y, repulseRadius));
        };
        this._processRepulse = (position, repulseRadius, area, divRepulse) => {
            const container = this.container, query = container.particles.quadTree.query(area, p => this.isEnabled(p)), repulseOptions = container.actualOptions.interactivity.modes.repulse;
            if (!repulseOptions) {
                return;
            }
            const { easing, speed, factor, maxSpeed } = repulseOptions, easingFunc = this._engine.getEasing(easing), velocity = (divRepulse?.speed ?? speed) * factor;
            for (const particle of query) {
                const { dx, dy, distance } = (0, engine_1.getDistances)(particle.position, position), repulseFactor = (0, engine_1.clamp)(easingFunc(easingOffset - distance / repulseRadius) * velocity, minSpeed, maxSpeed), normVec = engine_1.Vector.create(!distance ? velocity : (dx / distance) * repulseFactor, !distance ? velocity : (dy / distance) * repulseFactor);
                particle.position.addTo(normVec);
            }
        };
        this._singleSelectorRepulse = (selector, div) => {
            const container = this.container, repulse = container.actualOptions.interactivity.modes.repulse;
            if (!repulse) {
                return;
            }
            const query = document.querySelectorAll(selector);
            if (!query.length) {
                return;
            }
            query.forEach(item => {
                const elem = item, pxRatio = container.retina.pixelRatio, pos = {
                    x: (elem.offsetLeft + elem.offsetWidth * half) * pxRatio,
                    y: (elem.offsetTop + elem.offsetHeight * half) * pxRatio,
                }, repulseRadius = elem.offsetWidth * half * pxRatio, area = div.type === engine_1.DivType.circle
                    ? new engine_1.Circle(pos.x, pos.y, repulseRadius)
                    : new engine_1.Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), divs = repulse.divs, divRepulse = (0, engine_1.divMode)(divs, elem);
                this._processRepulse(pos, repulseRadius, area, divRepulse);
            });
        };
        this._engine = engine;
        if (!container.repulse) {
            container.repulse = { particles: [] };
        }
        this.handleClickMode = (mode) => {
            const options = this.container.actualOptions, repulseOpts = options.interactivity.modes.repulse;
            if (!repulseOpts || mode !== repulseMode) {
                return;
            }
            if (!container.repulse) {
                container.repulse = { particles: [] };
            }
            const repulse = container.repulse;
            repulse.clicking = true;
            repulse.count = 0;
            for (const particle of container.repulse.particles) {
                if (!this.isEnabled(particle)) {
                    continue;
                }
                particle.velocity.setTo(particle.initialVelocity);
            }
            repulse.particles = [];
            repulse.finish = false;
            setTimeout(() => {
                if (container.destroyed) {
                    return;
                }
                repulse.clicking = false;
            }, repulseOpts.duration * engine_1.millisecondsToSeconds);
        };
    }
    clear() {
    }
    init() {
        const container = this.container, repulse = container.actualOptions.interactivity.modes.repulse;
        if (!repulse) {
            return;
        }
        container.retina.repulseModeDistance = repulse.distance * container.retina.pixelRatio;
    }
    interact() {
        const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === engine_1.mouseMoveEvent, events = options.interactivity.events, hover = events.onHover, hoverEnabled = hover.enable, hoverMode = hover.mode, click = events.onClick, clickEnabled = click.enable, clickMode = click.mode, divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && (0, engine_1.isInArray)(repulseMode, hoverMode)) {
            this._hoverRepulse();
        }
        else if (clickEnabled && (0, engine_1.isInArray)(repulseMode, clickMode)) {
            this._clickRepulse();
        }
        else {
            (0, engine_1.divModeExecute)(repulseMode, divs, (selector, div) => this._singleSelectorRepulse(selector, div));
        }
    }
    isEnabled(particle) {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = (particle?.interactivity ?? options.interactivity).events, divs = events.onDiv, hover = events.onHover, click = events.onClick, divRepulse = (0, engine_1.isDivModeEnabled)(repulseMode, divs);
        if (!(divRepulse || (hover.enable && !!mouse.position) || (click.enable && mouse.clickPosition))) {
            return false;
        }
        const hoverMode = hover.mode, clickMode = click.mode;
        return (0, engine_1.isInArray)(repulseMode, hoverMode) || (0, engine_1.isInArray)(repulseMode, clickMode) || divRepulse;
    }
    loadModeOptions(options, ...sources) {
        if (!options.repulse) {
            options.repulse = new Repulse_js_1.Repulse();
        }
        for (const source of sources) {
            options.repulse.load(source?.repulse);
        }
    }
    reset() {
    }
}
exports.Repulser = Repulser;
