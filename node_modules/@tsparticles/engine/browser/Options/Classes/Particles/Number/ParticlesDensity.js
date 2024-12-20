import { isNull } from "../../../../Utils/TypeUtils.js";
export class ParticlesDensity {
    constructor() {
        this.enable = false;
        this.width = 1920;
        this.height = 1080;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const width = data.width;
        if (width !== undefined) {
            this.width = width;
        }
        const height = data.height;
        if (height !== undefined) {
            this.height = height;
        }
    }
}
