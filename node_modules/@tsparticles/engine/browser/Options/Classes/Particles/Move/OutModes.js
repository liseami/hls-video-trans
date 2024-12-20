import { OutMode } from "../../../../Enums/Modes/OutMode.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
export class OutModes {
    constructor() {
        this.default = OutMode.out;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.default !== undefined) {
            this.default = data.default;
        }
        this.bottom = data.bottom ?? data.default;
        this.left = data.left ?? data.default;
        this.right = data.right ?? data.default;
        this.top = data.top ?? data.default;
    }
}
