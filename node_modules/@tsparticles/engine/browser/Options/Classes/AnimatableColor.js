import { isArray, isNull, isString } from "../../Utils/TypeUtils.js";
import { HslAnimation } from "./HslAnimation.js";
import { OptionsColor } from "./OptionsColor.js";
export class AnimatableColor extends OptionsColor {
    constructor() {
        super();
        this.animation = new HslAnimation();
    }
    static create(source, data) {
        const color = new AnimatableColor();
        color.load(source);
        if (data !== undefined) {
            if (isString(data) || isArray(data)) {
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
        if (isNull(data)) {
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
