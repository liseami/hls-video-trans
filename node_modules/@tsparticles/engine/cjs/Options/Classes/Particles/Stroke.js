"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stroke = void 0;
const AnimatableColor_js_1 = require("../AnimatableColor.js");
const TypeUtils_js_1 = require("../../../Utils/TypeUtils.js");
const NumberUtils_js_1 = require("../../../Utils/NumberUtils.js");
class Stroke {
    constructor() {
        this.width = 0;
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.color !== undefined) {
            this.color = AnimatableColor_js_1.AnimatableColor.create(this.color, data.color);
        }
        if (data.width !== undefined) {
            this.width = (0, NumberUtils_js_1.setRangeValue)(data.width);
        }
        if (data.opacity !== undefined) {
            this.opacity = (0, NumberUtils_js_1.setRangeValue)(data.opacity);
        }
    }
}
exports.Stroke = Stroke;
