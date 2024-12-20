import { RangedAnimationValueWithRandom } from "../../ValueWithRandom.js";
import { SizeAnimation } from "./SizeAnimation.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
export class Size extends RangedAnimationValueWithRandom {
    constructor() {
        super();
        this.animation = new SizeAnimation();
        this.value = 3;
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
