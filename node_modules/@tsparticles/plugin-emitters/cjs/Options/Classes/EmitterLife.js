"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitterLife = void 0;
const engine_1 = require("@tsparticles/engine");
class EmitterLife {
    constructor() {
        this.wait = false;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        if (data.delay !== undefined) {
            this.delay = (0, engine_1.setRangeValue)(data.delay);
        }
        if (data.duration !== undefined) {
            this.duration = (0, engine_1.setRangeValue)(data.duration);
        }
        if (data.wait !== undefined) {
            this.wait = data.wait;
        }
    }
}
exports.EmitterLife = EmitterLife;
