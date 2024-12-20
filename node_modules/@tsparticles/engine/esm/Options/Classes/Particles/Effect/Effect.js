import { deepExtend } from "../../../../Utils/Utils.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
export class Effect {
    constructor() {
        this.close = true;
        this.fill = true;
        this.options = {};
        this.type = [];
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        const options = data.options;
        if (options !== undefined) {
            for (const effect in options) {
                const item = options[effect];
                if (item) {
                    this.options[effect] = deepExtend(this.options[effect] ?? {}, item);
                }
            }
        }
        if (data.close !== undefined) {
            this.close = data.close;
        }
        if (data.fill !== undefined) {
            this.fill = data.fill;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
