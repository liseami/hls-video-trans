(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine", "./Enums/AbsorberClickMode.js", "./AbsorberInstance.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Absorbers = void 0;
    const engine_1 = require("@tsparticles/engine");
    const AbsorberClickMode_js_1 = require("./Enums/AbsorberClickMode.js");
    const AbsorberInstance_js_1 = require("./AbsorberInstance.js");
    const defaultIndex = 0;
    class Absorbers {
        constructor(container, engine) {
            this._container = container;
            this._engine = engine;
            this.array = [];
            this.absorbers = [];
            this.interactivityAbsorbers = [];
            container.getAbsorber = (idxOrName) => idxOrName === undefined || (0, engine_1.isNumber)(idxOrName)
                ? this.array[idxOrName ?? defaultIndex]
                : this.array.find(t => t.name === idxOrName);
            container.addAbsorber = async (options, position) => this.addAbsorber(options, position);
        }
        async addAbsorber(options, position) {
            const absorber = new AbsorberInstance_js_1.AbsorberInstance(this, this._container, this._engine, options, position);
            this.array.push(absorber);
            return Promise.resolve(absorber);
        }
        draw(context) {
            for (const absorber of this.array) {
                absorber.draw(context);
            }
        }
        handleClickMode(mode) {
            const absorberOptions = this.absorbers, modeAbsorbers = this.interactivityAbsorbers;
            if (mode === AbsorberClickMode_js_1.AbsorberClickMode.absorber) {
                const absorbersModeOptions = (0, engine_1.itemFromSingleOrMultiple)(modeAbsorbers), absorbersOptions = absorbersModeOptions ?? (0, engine_1.itemFromSingleOrMultiple)(absorberOptions), aPosition = this._container.interactivity.mouse.clickPosition;
                void this.addAbsorber(absorbersOptions, aPosition);
            }
        }
        async init() {
            this.absorbers = this._container.actualOptions.absorbers;
            this.interactivityAbsorbers = this._container.actualOptions.interactivity.modes.absorbers;
            const promises = (0, engine_1.executeOnSingleOrMultiple)(this.absorbers, async (absorber) => {
                await this.addAbsorber(absorber);
            });
            if (promises instanceof Array) {
                await Promise.all(promises);
            }
            else {
                await promises;
            }
        }
        particleUpdate(particle) {
            for (const absorber of this.array) {
                absorber.attract(particle);
                if (particle.destroyed) {
                    break;
                }
            }
        }
        removeAbsorber(absorber) {
            const index = this.array.indexOf(absorber), deleteCount = 1;
            if (index >= defaultIndex) {
                this.array.splice(index, deleteCount);
            }
        }
        resize() {
            for (const absorber of this.array) {
                absorber.resize();
            }
        }
        stop() {
            this.array = [];
        }
    }
    exports.Absorbers = Absorbers;
});
