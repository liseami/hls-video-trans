"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitters = void 0;
const engine_1 = require("@tsparticles/engine");
const Emitter_js_1 = require("./Options/Classes/Emitter.js");
const EmitterClickMode_js_1 = require("./Enums/EmitterClickMode.js");
const EmitterInstance_js_1 = require("./EmitterInstance.js");
class Emitters {
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
        container.getEmitter = (idxOrName) => idxOrName === undefined || (0, engine_1.isNumber)(idxOrName)
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
        const emitterOptions = new Emitter_js_1.Emitter();
        emitterOptions.load(options);
        const emitter = new EmitterInstance_js_1.EmitterInstance(this._engine, this, this.container, emitterOptions, position);
        await emitter.init();
        this.array.push(emitter);
        return emitter;
    }
    handleClickMode(mode) {
        const emitterOptions = this.emitters, modeEmitters = this.interactivityEmitters;
        if (mode !== EmitterClickMode_js_1.EmitterClickMode.emitter) {
            return;
        }
        let emittersModeOptions;
        if (modeEmitters && (0, engine_1.isArray)(modeEmitters.value)) {
            const minLength = 0;
            if (modeEmitters.value.length > minLength && modeEmitters.random.enable) {
                emittersModeOptions = [];
                const usedIndexes = [];
                for (let i = 0; i < modeEmitters.random.count; i++) {
                    const idx = (0, engine_1.arrayRandomIndex)(modeEmitters.value);
                    if (usedIndexes.includes(idx) && usedIndexes.length < modeEmitters.value.length) {
                        i--;
                        continue;
                    }
                    usedIndexes.push(idx);
                    emittersModeOptions.push((0, engine_1.itemFromArray)(modeEmitters.value, idx));
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
        void (0, engine_1.executeOnSingleOrMultiple)(emittersOptions, async (emitter) => {
            await this.addEmitter(emitter, ePosition);
        });
    }
    async init() {
        this.emitters = this.container.actualOptions.emitters;
        this.interactivityEmitters = this.container.actualOptions.interactivity.modes.emitters;
        if (!this.emitters) {
            return;
        }
        if ((0, engine_1.isArray)(this.emitters)) {
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
exports.Emitters = Emitters;
