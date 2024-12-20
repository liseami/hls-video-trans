import { ValueWithRandom, isNull, isNumber } from "@tsparticles/engine";
import { AbsorberSizeLimit } from "./AbsorberSizeLimit.js";
export class AbsorberSize extends ValueWithRandom {
    constructor() {
        super();
        this.density = 5;
        this.value = 50;
        this.limit = new AbsorberSizeLimit();
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        super.load(data);
        if (data.density !== undefined) {
            this.density = data.density;
        }
        if (isNumber(data.limit)) {
            this.limit.radius = data.limit;
        }
        else {
            this.limit.load(data.limit);
        }
    }
}
