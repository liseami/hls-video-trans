import { AnimationOptions, RangedAnimationOptions } from "./AnimationOptions";
import { Random } from "./Random";
import { isBoolean } from "../../Utils/Utils";
import { setRangeValue } from "../../Utils/NumberUtils";
export class ValueWithRandom {
    constructor() {
        this.random = new Random();
        this.value = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (isBoolean(data.random)) {
            this.random.enable = data.random;
        }
        else {
            this.random.load(data.random);
        }
        if (data.value !== undefined) {
            this.value = setRangeValue(data.value, this.random.enable ? this.random.minimumValue : undefined);
        }
    }
}
export class AnimationValueWithRandom extends ValueWithRandom {
    constructor() {
        super();
        this.animation = new AnimationOptions();
    }
    get anim() {
        return this.animation;
    }
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        const animation = data.animation ?? data.anim;
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
        if (!data) {
            return;
        }
        const animation = data.animation ?? data.anim;
        if (animation !== undefined) {
            this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
    }
}
