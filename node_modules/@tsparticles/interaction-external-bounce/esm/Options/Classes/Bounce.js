import { isNull } from "@tsparticles/engine";
export class Bounce {
    constructor() {
        this.distance = 200;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
    }
}
