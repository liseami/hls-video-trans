import { deepExtend } from "../../../../Utils/Utils";
import { setRangeValue } from "../../../../Utils/NumberUtils";
export class Spin {
    constructor() {
        this.acceleration = 0;
        this.enable = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.acceleration !== undefined) {
            this.acceleration = setRangeValue(data.acceleration);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.position) {
            this.position = deepExtend({}, data.position);
        }
    }
}
