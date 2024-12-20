"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeAnimation = void 0;
const AnimationOptions_1 = require("../../AnimationOptions");
class SizeAnimation extends AnimationOptions_1.RangedAnimationOptions {
    constructor() {
        super();
        this.destroy = "none";
        this.speed = 5;
    }
    get size_min() {
        return this.minimumValue;
    }
    set size_min(value) {
        this.minimumValue = value;
    }
    load(data) {
        if (data?.size_min !== undefined && data.minimumValue === undefined) {
            data.minimumValue = data.size_min;
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
exports.SizeAnimation = SizeAnimation;
