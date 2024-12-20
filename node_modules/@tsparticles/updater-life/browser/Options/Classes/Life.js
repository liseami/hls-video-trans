import { isNull } from "@tsparticles/engine";
import { LifeDelay } from "./LifeDelay.js";
import { LifeDuration } from "./LifeDuration.js";
export class Life {
    constructor() {
        this.count = 0;
        this.delay = new LifeDelay();
        this.duration = new LifeDuration();
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        this.delay.load(data.delay);
        this.duration.load(data.duration);
    }
}
