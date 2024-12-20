import { isNull } from "../../../../Utils/TypeUtils.js";
export class ResizeEvent {
    constructor() {
        this.delay = 0.5;
        this.enable = true;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.delay !== undefined) {
            this.delay = data.delay;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
