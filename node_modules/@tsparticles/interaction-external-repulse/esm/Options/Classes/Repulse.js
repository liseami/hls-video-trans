import { executeOnSingleOrMultiple, isNull, } from "@tsparticles/engine";
import { RepulseBase } from "./RepulseBase.js";
import { RepulseDiv } from "./RepulseDiv.js";
export class Repulse extends RepulseBase {
    load(data) {
        super.load(data);
        if (isNull(data)) {
            return;
        }
        this.divs = executeOnSingleOrMultiple(data.divs, div => {
            const tmp = new RepulseDiv();
            tmp.load(div);
            return tmp;
        });
    }
}
