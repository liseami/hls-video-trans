import { executeOnSingleOrMultiple, isNumber, itemFromSingleOrMultiple, } from "@tsparticles/engine";
import { AbsorberClickMode } from "./Enums/AbsorberClickMode.js";
import { AbsorberInstance } from "./AbsorberInstance.js";
const defaultIndex = 0;
export class Absorbers {
    constructor(container, engine) {
        this._container = container;
        this._engine = engine;
        this.array = [];
        this.absorbers = [];
        this.interactivityAbsorbers = [];
        container.getAbsorber = (idxOrName) => idxOrName === undefined || isNumber(idxOrName)
            ? this.array[idxOrName ?? defaultIndex]
            : this.array.find(t => t.name === idxOrName);
        container.addAbsorber = async (options, position) => this.addAbsorber(options, position);
    }
    async addAbsorber(options, position) {
        const absorber = new AbsorberInstance(this, this._container, this._engine, options, position);
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
        if (mode === AbsorberClickMode.absorber) {
            const absorbersModeOptions = itemFromSingleOrMultiple(modeAbsorbers), absorbersOptions = absorbersModeOptions ?? itemFromSingleOrMultiple(absorberOptions), aPosition = this._container.interactivity.mouse.clickPosition;
            void this.addAbsorber(absorbersOptions, aPosition);
        }
    }
    async init() {
        this.absorbers = this._container.actualOptions.absorbers;
        this.interactivityAbsorbers = this._container.actualOptions.interactivity.modes.absorbers;
        const promises = executeOnSingleOrMultiple(this.absorbers, async (absorber) => {
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
