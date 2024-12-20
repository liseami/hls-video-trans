import { isNull } from "@tsparticles/engine";
import { TwinkleValues } from "./TwinkleValues.js";
export class Twinkle {
    constructor() {
        this.lines = new TwinkleValues();
        this.particles = new TwinkleValues();
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        this.lines.load(data.lines);
        this.particles.load(data.particles);
    }
}
