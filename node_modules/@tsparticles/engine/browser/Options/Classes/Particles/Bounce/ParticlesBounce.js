import { ParticlesBounceFactor } from "./ParticlesBounceFactor.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
export class ParticlesBounce {
    constructor() {
        this.horizontal = new ParticlesBounceFactor();
        this.vertical = new ParticlesBounceFactor();
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        this.horizontal.load(data.horizontal);
        this.vertical.load(data.vertical);
    }
}
