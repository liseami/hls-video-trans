import { AnimatableColor } from "../AnimatableColor";
import { setRangeValue } from "../../../Utils/NumberUtils";
export class Stroke {
    constructor() {
        this.width = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = AnimatableColor.create(this.color, data.color);
        }
        if (data.width !== undefined) {
            this.width = setRangeValue(data.width);
        }
        if (data.opacity !== undefined) {
            this.opacity = setRangeValue(data.opacity);
        }
    }
}
