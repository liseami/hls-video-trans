import { RangedAnimationOptions } from "../../AnimationOptions";
export class OpacityAnimation extends RangedAnimationOptions {
    constructor() {
        super();
        this.destroy = "none";
        this.speed = 2;
    }
    get opacity_min() {
        return this.minimumValue;
    }
    set opacity_min(value) {
        this.minimumValue = value;
    }
    load(data) {
        if (data?.opacity_min !== undefined && data.minimumValue === undefined) {
            data.minimumValue = data.opacity_min;
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
