import { setRangeValue } from "../../Utils/NumberUtils";
export class ColorAnimation {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.offset = 0;
        this.speed = 1;
        this.delay = 0;
        this.decay = 0;
        this.sync = true;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = setRangeValue(data.count);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.offset !== undefined) {
            this.offset = setRangeValue(data.offset);
        }
        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }
        if (data.decay !== undefined) {
            this.decay = setRangeValue(data.decay);
        }
        if (data.delay !== undefined) {
            this.delay = setRangeValue(data.delay);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
