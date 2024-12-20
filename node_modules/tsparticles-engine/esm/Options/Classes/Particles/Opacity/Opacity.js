import { OpacityAnimation } from "./OpacityAnimation";
import { ValueWithRandom } from "../../ValueWithRandom";
import { setRangeValue } from "../../../../Utils/NumberUtils";
export class Opacity extends ValueWithRandom {
    constructor() {
        super();
        this.animation = new OpacityAnimation();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }
    get anim() {
        return this.animation;
    }
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        const animation = data.animation ?? data.anim;
        if (animation !== undefined) {
            this.animation.load(animation);
            this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
    }
}
