import { ParticlesDensity } from "./ParticlesDensity.js";
import { ParticlesNumberLimit } from "./ParticlesNumberLimit.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
export class ParticlesNumber {
    constructor() {
        this.density = new ParticlesDensity();
        this.limit = new ParticlesNumberLimit();
        this.value = 0;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        this.density.load(data.density);
        this.limit.load(data.limit);
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
