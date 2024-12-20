import { isNull, setRangeValue } from "@tsparticles/engine";
export class WobbleSpeed {
    constructor() {
        this.angle = 50;
        this.move = 10;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.angle !== undefined) {
            this.angle = setRangeValue(data.angle);
        }
        if (data.move !== undefined) {
            this.move = setRangeValue(data.move);
        }
    }
}
