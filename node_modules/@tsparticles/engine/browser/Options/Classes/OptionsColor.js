import { isArray, isNull, isString } from "../../Utils/TypeUtils.js";
export class OptionsColor {
    constructor() {
        this.value = "";
    }
    static create(source, data) {
        const color = new OptionsColor();
        color.load(source);
        if (data !== undefined) {
            if (isString(data) || isArray(data)) {
                color.load({ value: data });
            }
            else {
                color.load(data);
            }
        }
        return color;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (!isNull(data.value)) {
            this.value = data.value;
        }
    }
}
