import { executeOnSingleOrMultiple, isNull, } from "@tsparticles/engine";
import { BubbleBase } from "./BubbleBase.js";
import { BubbleDiv } from "./BubbleDiv.js";
export class Bubble extends BubbleBase {
    load(data) {
        super.load(data);
        if (isNull(data)) {
            return;
        }
        this.divs = executeOnSingleOrMultiple(data.divs, div => {
            const tmp = new BubbleDiv();
            tmp.load(div);
            return tmp;
        });
    }
}
