import { ValueWithRandom, isNull } from "@tsparticles/engine";
export class LifeDelay extends ValueWithRandom {
    constructor() {
        super();
        this.sync = false;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        super.load(data);
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
