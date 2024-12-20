"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pusher = void 0;
const engine_1 = require("@tsparticles/engine");
const Push_js_1 = require("./Options/Classes/Push.js");
const pushMode = "push", minQuantity = 0;
class Pusher extends engine_1.ExternalInteractorBase {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            if (mode !== pushMode) {
                return;
            }
            const container = this.container, options = container.actualOptions, pushOptions = options.interactivity.modes.push;
            if (!pushOptions) {
                return;
            }
            const quantity = (0, engine_1.getRangeValue)(pushOptions.quantity);
            if (quantity <= minQuantity) {
                return;
            }
            const group = (0, engine_1.itemFromArray)([undefined, ...pushOptions.groups]), groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined;
            void container.particles.push(quantity, container.interactivity.mouse, groupOptions, group);
        };
    }
    clear() {
    }
    init() {
    }
    interact() {
    }
    isEnabled() {
        return true;
    }
    loadModeOptions(options, ...sources) {
        if (!options.push) {
            options.push = new Push_js_1.Push();
        }
        for (const source of sources) {
            options.push.load(source?.push);
        }
    }
    reset() {
    }
}
exports.Pusher = Pusher;
