import { RotateDirection, ValueWithRandom, isNull, } from "@tsparticles/engine";
import { RotateAnimation } from "./RotateAnimation.js";
export class Rotate extends ValueWithRandom {
    constructor() {
        super();
        this.animation = new RotateAnimation();
        this.direction = RotateDirection.clockwise;
        this.path = false;
        this.value = 0;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        super.load(data);
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        this.animation.load(data.animation);
        if (data.path !== undefined) {
            this.path = data.path;
        }
    }
}
