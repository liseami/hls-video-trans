import { AnimationOptions } from "./AnimationOptions.js";
import { isNull } from "../../Utils/TypeUtils.js";
import { setRangeValue } from "../../Utils/NumberUtils.js";
export class ColorAnimation extends AnimationOptions {
    constructor() {
        super();
        this.offset = 0;
        this.sync = true;
    }
    load(data) {
        super.load(data);
        if (isNull(data)) {
            return;
        }
        if (data.offset !== undefined) {
            this.offset = setRangeValue(data.offset);
        }
    }
}
