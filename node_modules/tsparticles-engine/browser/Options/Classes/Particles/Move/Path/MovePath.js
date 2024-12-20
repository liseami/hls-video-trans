import { ValueWithRandom } from "../../../ValueWithRandom";
import { deepExtend } from "../../../../../Utils/Utils";
export class MovePath {
    constructor() {
        this.clamp = true;
        this.delay = new ValueWithRandom();
        this.enable = false;
        this.options = {};
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.clamp !== undefined) {
            this.clamp = data.clamp;
        }
        this.delay.load(data.delay);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.generator = data.generator;
        if (data.options) {
            this.options = deepExtend(this.options, data.options);
        }
    }
}
