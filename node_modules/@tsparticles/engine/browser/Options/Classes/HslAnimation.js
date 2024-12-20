import { ColorAnimation } from "./ColorAnimation.js";
import { isNull } from "../../Utils/TypeUtils.js";
export class HslAnimation {
    constructor() {
        this.h = new ColorAnimation();
        this.s = new ColorAnimation();
        this.l = new ColorAnimation();
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        this.h.load(data.h);
        this.s.load(data.s);
        this.l.load(data.l);
    }
}
