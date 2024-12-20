import { RangedAnimationOptions } from "../../AnimationOptions";
export class SizeAnimation extends RangedAnimationOptions {
    constructor() {
        super();
        this.destroy = "none";
        this.speed = 5;
    }
    get size_min() {
        return this.minimumValue;
    }
    set size_min(value) {
        this.minimumValue = value;
    }
    load(data) {
        if (data?.size_min !== undefined && data.minimumValue === undefined) {
            data.minimumValue = data.size_min;
        }
        super.load(data);
        if (!data) {
            return;
        }
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
    }
}
