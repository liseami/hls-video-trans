import { Parallax } from "./Parallax.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
export class HoverEvent {
    constructor() {
        this.enable = false;
        this.mode = [];
        this.parallax = new Parallax();
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.parallax.load(data.parallax);
    }
}
