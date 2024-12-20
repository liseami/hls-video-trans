import { isNull } from "@tsparticles/engine";
export class Slow {
    constructor() {
        this.factor = 3;
        this.radius = 200;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
