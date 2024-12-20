"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorAnimation = void 0;
const AnimationOptions_js_1 = require("./AnimationOptions.js");
const TypeUtils_js_1 = require("../../Utils/TypeUtils.js");
const NumberUtils_js_1 = require("../../Utils/NumberUtils.js");
class ColorAnimation extends AnimationOptions_js_1.AnimationOptions {
    constructor() {
        super();
        this.offset = 0;
        this.sync = true;
    }
    load(data) {
        super.load(data);
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.offset !== undefined) {
            this.offset = (0, NumberUtils_js_1.setRangeValue)(data.offset);
        }
    }
}
exports.ColorAnimation = ColorAnimation;
