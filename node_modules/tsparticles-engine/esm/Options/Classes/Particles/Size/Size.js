import { SizeAnimation } from "./SizeAnimation";
import { ValueWithRandom } from "../../ValueWithRandom";
import { setRangeValue } from "../../../../Utils/NumberUtils";
export class Size extends ValueWithRandom {
    constructor() {
        super();
        this.animation = new SizeAnimation();
        this.random.minimumValue = 1;
        this.value = 3;
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
            this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
    }
}
