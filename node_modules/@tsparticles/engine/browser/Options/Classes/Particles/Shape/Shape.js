import { deepExtend } from "../../../../Utils/Utils.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
export class Shape {
    constructor() {
        this.close = true;
        this.fill = true;
        this.options = {};
        this.type = "circle";
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        const options = data.options;
        if (options !== undefined) {
            for (const shape in options) {
                const item = options[shape];
                if (item) {
                    this.options[shape] = deepExtend(this.options[shape] ?? {}, item);
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
