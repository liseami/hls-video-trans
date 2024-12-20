"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpacityAnimation = void 0;
const AnimationOptions_1 = require("../../AnimationOptions");
class OpacityAnimation extends AnimationOptions_1.RangedAnimationOptions {
    constructor() {
        super();
        this.destroy = "none";
        this.speed = 2;
    }
    get opacity_min() {
        return this.minimumValue;
    }
    set opacity_min(value) {
        this.minimumValue = value;
    }
    load(data) {
        if (data?.opacity_min !== undefined && data.minimumValue === undefined) {
            data.minimumValue = data.opacity_min;
        }
        super.load(data);
        if (!data) {
            return;
        }
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
    }
}
exports.OpacityAnimation = OpacityAnimation;
