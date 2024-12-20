import { AnimationOptions, RangedAnimationOptions } from "./AnimationOptions.js";
import { isNull } from "../../Utils/TypeUtils.js";
import { setRangeValue } from "../../Utils/NumberUtils.js";
export class ValueWithRandom {
    constructor() {
        this.value = 0;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (!isNull(data.value)) {
            this.value = setRangeValue(data.value);
        }
    }
}
export class AnimationValueWithRandom extends ValueWithRandom {
    constructor() {
        super();
        this.animation = new AnimationOptions();
    }
    load(data) {
        super.load(data);
        if (isNull(data)) {
            return;
        }
        const animation = data.animation;
        if (animation !== undefined) {
            this.animation.load(animation);
        }
    }
}
export class RangedAnimationValueWithRandom extends AnimationValueWithRandom {
    constructor() {
        super();
        this.animation = new RangedAnimationOptions();
    }
    load(data) {
        super.load(data);
    }
}
