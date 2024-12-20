import { isNull, setRangeValue } from "@tsparticles/engine";
export class EmitterLife {
    constructor() {
        this.wait = false;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        if (data.delay !== undefined) {
            this.delay = setRangeValue(data.delay);
        }
        if (data.duration !== undefined) {
            this.duration = setRangeValue(data.duration);
        }
        if (data.wait !== undefined) {
            this.wait = data.wait;
        }
    }
}
