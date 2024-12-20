"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmittersPlugin = void 0;
const engine_1 = require("@tsparticles/engine");
const Emitter_js_1 = require("./Options/Classes/Emitter.js");
const EmitterClickMode_js_1 = require("./Enums/EmitterClickMode.js");
const Emitters_js_1 = require("./Emitters.js");
class EmittersPlugin {
    constructor(engine) {
        this._engine = engine;
        this.id = "emitters";
    }
    getPlugin(container) {
        return Promise.resolve(new Emitters_js_1.Emitters(this._engine, container));
    }
    loadOptions(options, source) {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }
        if (source?.emitters) {
            options.emitters = (0, engine_1.executeOnSingleOrMultiple)(source.emitters, emitter => {
                const tmp = new Emitter_js_1.Emitter();
                tmp.load(emitter);
                return tmp;
            });
        }
        const interactivityEmitters = source?.interactivity?.modes?.emitters;
        if (interactivityEmitters) {
            if ((0, engine_1.isArray)(interactivityEmitters)) {
                options.interactivity.modes.emitters = {
                    random: {
                        count: 1,
                        enable: true,
                    },
                    value: interactivityEmitters.map(s => {
                        const tmp = new Emitter_js_1.Emitter();
                        tmp.load(s);
                        return tmp;
                    }),
                };
            }
            else {
                const emitterMode = interactivityEmitters;
                if (emitterMode.value !== undefined) {
                    const defaultCount = 1;
                    if ((0, engine_1.isArray)(emitterMode.value)) {
                        options.interactivity.modes.emitters = {
                            random: {
                                count: emitterMode.random.count ?? defaultCount,
                                enable: emitterMode.random.enable ?? false,
                            },
                            value: emitterMode.value.map(s => {
                                const tmp = new Emitter_js_1.Emitter();
                                tmp.load(s);
                                return tmp;
                            }),
                        };
                    }
                    else {
                        const tmp = new Emitter_js_1.Emitter();
                        tmp.load(emitterMode.value);
                        options.interactivity.modes.emitters = {
                            random: {
                                count: emitterMode.random.count ?? defaultCount,
                                enable: emitterMode.random.enable ?? false,
                            },
                            value: tmp,
                        };
                    }
                }
                else {
                    const emitterOptions = (options.interactivity.modes.emitters = {
                        random: {
                            count: 1,
                            enable: false,
                        },
                        value: new Emitter_js_1.Emitter(),
                    });
                    emitterOptions.value.load(interactivityEmitters);
                }
            }
        }
    }
    needsPlugin(options) {
        if (!options) {
            return false;
        }
        const emitters = options.emitters;
        return (((0, engine_1.isArray)(emitters) && !!emitters.length) ||
            emitters !== undefined ||
            (!!options.interactivity?.events?.onClick?.mode &&
                (0, engine_1.isInArray)(EmitterClickMode_js_1.EmitterClickMode.emitter, options.interactivity.events.onClick.mode)));
    }
}
exports.EmittersPlugin = EmittersPlugin;
