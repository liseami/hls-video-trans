import { LimitMode } from "../../../../Enums/Modes/LimitMode.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
export class ParticlesNumberLimit {
    constructor() {
        this.mode = LimitMode.delete;
        this.value = 0;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
