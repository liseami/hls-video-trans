"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stroke = void 0;
const AnimatableColor_1 = require("../AnimatableColor");
const NumberUtils_1 = require("../../../Utils/NumberUtils");
class Stroke {
    constructor() {
        this.width = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = AnimatableColor_1.AnimatableColor.create(this.color, data.color);
        }
        if (data.width !== undefined) {
            this.width = (0, NumberUtils_1.setRangeValue)(data.width);
        }
        if (data.opacity !== undefined) {
            this.opacity = (0, NumberUtils_1.setRangeValue)(data.opacity);
        }
    }
}
exports.Stroke = Stroke;
