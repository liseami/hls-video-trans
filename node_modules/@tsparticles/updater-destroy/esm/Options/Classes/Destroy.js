import { isNull } from "@tsparticles/engine";
import { DestroyBounds } from "./DestroyBounds.js";
import { DestroyMode } from "../../Enums/DestroyMode.js";
import { Split } from "./Split.js";
export class Destroy {
    constructor() {
        this.bounds = new DestroyBounds();
        this.mode = DestroyMode.none;
        this.split = new Split();
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.mode) {
            this.mode = data.mode;
        }
        if (data.bounds) {
            this.bounds.load(data.bounds);
        }
        this.split.load(data.split);
    }
}
