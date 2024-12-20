import { isNull, setRangeValue } from "@tsparticles/engine";
export class TiltAnimation {
    constructor() {
        this.enable = false;
        this.speed = 0;
        this.decay = 0;
        this.sync = false;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }
        if (data.decay !== undefined) {
            this.decay = setRangeValue(data.decay);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
