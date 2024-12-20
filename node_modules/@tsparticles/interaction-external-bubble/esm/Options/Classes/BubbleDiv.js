import { isNull } from "@tsparticles/engine";
import { BubbleBase } from "./BubbleBase.js";
export class BubbleDiv extends BubbleBase {
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
