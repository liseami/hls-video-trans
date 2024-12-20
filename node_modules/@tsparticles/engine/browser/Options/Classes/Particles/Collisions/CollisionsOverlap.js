import { isNull } from "../../../../Utils/TypeUtils.js";
export class CollisionsOverlap {
    constructor() {
        this.enable = true;
        this.retries = 0;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.retries !== undefined) {
            this.retries = data.retries;
        }
    }
}
