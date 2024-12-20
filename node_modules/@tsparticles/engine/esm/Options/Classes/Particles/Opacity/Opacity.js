import { OpacityAnimation } from "./OpacityAnimation.js";
import { RangedAnimationValueWithRandom } from "../../ValueWithRandom.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
export class Opacity extends RangedAnimationValueWithRandom {
    constructor() {
        super();
        this.animation = new OpacityAnimation();
        this.value = 1;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        super.load(data);
        const animation = data.animation;
        if (animation !== undefined) {
            this.animation.load(animation);
        }
    }
}
