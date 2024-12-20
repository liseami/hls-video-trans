import { isNull } from "@tsparticles/engine";
export class AbsorberSizeLimit {
    constructor() {
        this.radius = 0;
        this.mass = 0;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.mass !== undefined) {
            this.mass = data.mass;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
