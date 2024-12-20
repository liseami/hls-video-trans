import { setRangeValue } from "../../Utils/NumberUtils";
export class AnimationOptions {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 1;
        this.decay = 0;
        this.delay = 0;
        this.sync = false;
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
export class RangedAnimationOptions extends AnimationOptions {
    constructor() {
        super();
        this.mode = "auto";
        this.startValue = "random";
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.minimumValue !== undefined) {
            this.minimumValue = data.minimumValue;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
    }
}
