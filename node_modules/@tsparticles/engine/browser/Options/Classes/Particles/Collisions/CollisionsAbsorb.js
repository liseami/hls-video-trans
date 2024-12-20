import { isNull } from "../../../../Utils/TypeUtils.js";
export class CollisionsAbsorb {
    constructor() {
        this.speed = 2;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
