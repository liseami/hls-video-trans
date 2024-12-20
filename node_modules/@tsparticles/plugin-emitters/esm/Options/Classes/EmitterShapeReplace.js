import { isNull } from "@tsparticles/engine";
export class EmitterShapeReplace {
    constructor() {
        this.color = false;
        this.opacity = false;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.color !== undefined) {
            this.color = data.color;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
