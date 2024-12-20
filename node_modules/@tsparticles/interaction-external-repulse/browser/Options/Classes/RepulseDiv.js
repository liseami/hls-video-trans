import { isNull } from "@tsparticles/engine";
import { RepulseBase } from "./RepulseBase.js";
export class RepulseDiv extends RepulseBase {
    constructor() {
        super();
        this.selectors = [];
    }
    load(data) {
        super.load(data);
        if (isNull(data)) {
            return;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
    }
}
