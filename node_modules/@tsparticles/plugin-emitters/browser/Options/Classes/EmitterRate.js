import { isNull, setRangeValue } from "@tsparticles/engine";
export class EmitterRate {
    constructor() {
        this.quantity = 1;
        this.delay = 0.1;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.quantity !== undefined) {
            this.quantity = setRangeValue(data.quantity);
        }
        if (data.delay !== undefined) {
            this.delay = setRangeValue(data.delay);
        }
    }
}
