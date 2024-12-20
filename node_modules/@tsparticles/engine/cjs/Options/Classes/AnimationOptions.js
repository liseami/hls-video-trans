"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangedAnimationOptions = exports.AnimationOptions = void 0;
const AnimationMode_js_1 = require("../../Enums/Modes/AnimationMode.js");
const StartValueType_js_1 = require("../../Enums/Types/StartValueType.js");
const TypeUtils_js_1 = require("../../Utils/TypeUtils.js");
const NumberUtils_js_1 = require("../../Utils/NumberUtils.js");
class AnimationOptions {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 1;
        this.decay = 0;
        this.delay = 0;
        this.sync = false;
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.count !== undefined) {
            this.count = (0, NumberUtils_js_1.setRangeValue)(data.count);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = (0, NumberUtils_js_1.setRangeValue)(data.speed);
        }
        if (data.decay !== undefined) {
            this.decay = (0, NumberUtils_js_1.setRangeValue)(data.decay);
        }
        if (data.delay !== undefined) {
            this.delay = (0, NumberUtils_js_1.setRangeValue)(data.delay);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.AnimationOptions = AnimationOptions;
class RangedAnimationOptions extends AnimationOptions {
    constructor() {
        super();
        this.mode = AnimationMode_js_1.AnimationMode.auto;
        this.startValue = StartValueType_js_1.StartValueType.random;
    }
    load(data) {
        super.load(data);
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
    }
}
exports.RangedAnimationOptions = RangedAnimationOptions;
