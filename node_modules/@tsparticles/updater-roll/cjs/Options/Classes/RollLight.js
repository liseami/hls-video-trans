"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollLight = void 0;
const engine_1 = require("@tsparticles/engine");
class RollLight {
    constructor() {
        this.enable = false;
        this.value = 0;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.value !== undefined) {
            this.value = (0, engine_1.setRangeValue)(data.value);
        }
    }
}
exports.RollLight = RollLight;
