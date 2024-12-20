import { ValueWithRandom, isNull } from "@tsparticles/engine";
import { TiltDirection } from "../../TiltDirection.js";
import { TiltAnimation } from "./TiltAnimation.js";
export class Tilt extends ValueWithRandom {
    constructor() {
        super();
        this.animation = new TiltAnimation();
        this.direction = TiltDirection.clockwise;
        this.enable = false;
        this.value = 0;
    }
    load(data) {
        super.load(data);
        if (isNull(data)) {
            return;
        }
        this.animation.load(data.animation);
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
