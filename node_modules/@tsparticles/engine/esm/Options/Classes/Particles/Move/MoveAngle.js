import { isNull } from "../../../../Utils/TypeUtils.js";
import { setRangeValue } from "../../../../Utils/NumberUtils.js";
export class MoveAngle {
    constructor() {
        this.offset = 0;
        this.value = 90;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.offset !== undefined) {
            this.offset = setRangeValue(data.offset);
        }
        if (data.value !== undefined) {
            this.value = setRangeValue(data.value);
        }
    }
}
