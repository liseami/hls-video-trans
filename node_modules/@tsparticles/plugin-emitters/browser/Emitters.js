import { arrayRandomIndex, executeOnSingleOrMultiple, isArray, isNumber, itemFromArray, } from "@tsparticles/engine";
import { Emitter } from "./Options/Classes/Emitter.js";
import { EmitterClickMode } from "./Enums/EmitterClickMode.js";
import { EmitterInstance } from "./EmitterInstance.js";
export class Emitters {
    constructor(engine, container) {
        this.container = container;
        this._engine = engine;
        this.array = [];
        this.emitters = [];
        this.interactivityEmitters = {
            random: {
                count: 1,
                enable: false,
            },
            value: [],
        };
        const defaultIndex = 0;
        container.getEmitter = (idxOrName) => idxOrName === undefined || isNumber(idxOrName)
            ? this.array[idxOrName ?? defaultIndex]
            : this.array.find(t => t.name === idxOrName);
        container.addEmitter = async (options, position) => this.addEmitter(options, position);
        container.removeEmitter = (idxOrName) => {
            const emitter = container.getEmitter(idxOrName);
            if (emitter) {
                this.removeEmitter(emitter);
            }
        };
        container.playEmitter = (idxOrName) => {
            const emitter = container.getEmitter(idxOrName);
            if (emitter) {
                emitter.externalPlay();
            }
        };
        container.pauseEmitter = (idxOrName) => {
            const emitter = container.getEmitter(idxOrName);
            if (emitter) {
                emitter.externalPause();
            }
        };
    }
    async addEmitter(options, position) {
        const emitterOptions = new Emitter();
        emitterOptions.load(options);
        const emitter = new EmitterInstance(this._engine, this, this.container, emitterOptions, position);
        await emitter.init();
        this.array.push(emitter);
        return emitter;
    }
    handleClickMode(mode) {
        const emitterOptions = this.emitters, modeEmitters = this.interactivityEmitters;
        if (mode !== EmitterClickMode.emitter) {
            return;
        }
        let emittersModeOptions;
        if (modeEmitters && isArray(modeEmitters.value)) {
            const minLength = 0;
            if (modeEmitters.value.length > minLength && modeEmitters.random.enable) {
                emittersModeOptions = [];
                const usedIndexes = [];
                for (let i = 0; i < modeEmitters.random.count; i++) {
                    const idx = arrayRandomIndex(modeEmitters.value);
                    if (usedIndexes.includes(idx) && usedIndexes.length < modeEmitters.value.length) {
                        i--;
                        continue;
                    }
                    usedIndexes.push(idx);
                    emittersModeOptions.push(itemFromArray(modeEmitters.value, idx));
                }
            }
            else {
                emittersModeOptions = modeEmitters.value;
            }
        }
        else {
            emittersModeOptions = modeEmitters?.value;
        }
        const emittersOptions = emittersModeOptions ?? emitterOptions, ePosition = this.container.interactivity.mouse.clickPosition;
        void executeOnSingleOrMultiple(emittersOptions, async (emitter) => {
            await this.addEmitter(emitter, ePosition);
        });
    }
    async init() {
        this.emitters = this.container.actualOptions.emitters;
        this.interactivityEmitters = this.container.actualOptions.interactivity.modes.emitters;
        if (!this.emitters) {
            return;
        }
        if (isArray(this.emitters)) {
            for (const emitterOptions of this.emitters) {
                await this.addEmitter(emitterOptions);
            }
        }
        else {
            await this.addEmitter(this.emitters);
        }
    }
    pause() {
        for (const emitter of this.array) {
            emitter.pause();
        }
    }
    play() {
        for (const emitter of this.array) {
            emitter.play();
        }
    }
    removeEmitter(emitter) {
        const index = this.array.indexOf(emitter), minIndex = 0, deleteCount = 1;
        if (index >= minIndex) {
            this.array.splice(index, deleteCount);
        }
    }
    resize() {
        for (const emitter of this.array) {
            emitter.resize();
        }
    }
    stop() {
        this.array = [];
    }
    update(delta) {
        for (const emitter of this.array) {
            emitter.update(delta);
        }
    }
}
