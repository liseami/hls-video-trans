"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwinkleValues = void 0;
const engine_1 = require("@tsparticles/engine");
class TwinkleValues {
    constructor() {
        this.enable = false;
        this.frequency = 0.05;
        this.opacity = 1;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.color !== undefined) {
            this.color = engine_1.OptionsColor.create(this.color, data.color);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = (0, engine_1.setRangeValue)(data.opacity);
        }
    }
}
exports.TwinkleValues = TwinkleValues;
