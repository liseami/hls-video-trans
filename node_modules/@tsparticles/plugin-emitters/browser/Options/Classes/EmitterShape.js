import { deepExtend, isNull } from "@tsparticles/engine";
import { EmitterShapeReplace } from "./EmitterShapeReplace.js";
export class EmitterShape {
    constructor() {
        this.options = {};
        this.replace = new EmitterShapeReplace();
        this.type = "square";
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options ?? {});
        }
        this.replace.load(data.replace);
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
