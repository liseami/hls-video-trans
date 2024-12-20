import { executeOnSingleOrMultiple, isArray, isInArray, } from "@tsparticles/engine";
import { Emitter } from "./Options/Classes/Emitter.js";
import { EmitterClickMode } from "./Enums/EmitterClickMode.js";
import { Emitters } from "./Emitters.js";
export class EmittersPlugin {
    constructor(engine) {
        this._engine = engine;
        this.id = "emitters";
    }
    getPlugin(container) {
        return Promise.resolve(new Emitters(this._engine, container));
    }
    loadOptions(options, source) {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }
        if (source?.emitters) {
            options.emitters = executeOnSingleOrMultiple(source.emitters, emitter => {
                const tmp = new Emitter();
                tmp.load(emitter);
                return tmp;
            });
        }
        const interactivityEmitters = source?.interactivity?.modes?.emitters;
        if (interactivityEmitters) {
            if (isArray(interactivityEmitters)) {
                options.interactivity.modes.emitters = {
                    random: {
                        count: 1,
                        enable: true,
                    },
                    value: interactivityEmitters.map(s => {
                        const tmp = new Emitter();
                        tmp.load(s);
                        return tmp;
                    }),
                };
            }
            else {
                const emitterMode = interactivityEmitters;
                if (emitterMode.value !== undefined) {
                    const defaultCount = 1;
                    if (isArray(emitterMode.value)) {
                        options.interactivity.modes.emitters = {
                            random: {
                                count: emitterMode.random.count ?? defaultCount,
                                enable: emitterMode.random.enable ?? false,
                            },
                            value: emitterMode.value.map(s => {
                                const tmp = new Emitter();
                                tmp.load(s);
                                return tmp;
                            }),
                        };
                    }
                    else {
                        const tmp = new Emitter();
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
                        value: new Emitter(),
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
        return ((isArray(emitters) && !!emitters.length) ||
            emitters !== undefined ||
            (!!options.interactivity?.events?.onClick?.mode &&
                isInArray(EmitterClickMode.emitter, options.interactivity.events.onClick.mode)));
    }
}
