"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatableColor = void 0;
const Utils_1 = require("../../Utils/Utils");
const HslAnimation_1 = require("./HslAnimation");
const OptionsColor_1 = require("./OptionsColor");
class AnimatableColor extends OptionsColor_1.OptionsColor {
    constructor() {
        super();
        this.animation = new HslAnimation_1.HslAnimation();
    }
    static create(source, data) {
        const color = new AnimatableColor();
        color.load(source);
        if (data !== undefined) {
            if ((0, Utils_1.isString)(data) || (0, Utils_1.isArray)(data)) {
                color.load({ value: data });
            }
            else {
                color.load(data);
            }
        }
        return color;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        const colorAnimation = data.animation;
        if (colorAnimation !== undefined) {
            if (colorAnimation.enable !== undefined) {
                this.animation.h.load(colorAnimation);
            }
            else {
                this.animation.load(data.animation);
            }
        }
    }
}
exports.AnimatableColor = AnimatableColor;
