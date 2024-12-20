import { PixelMode, isNull } from "@tsparticles/engine";
export class EmitterSize {
    constructor() {
        this.mode = PixelMode.percent;
        this.height = 0;
        this.width = 0;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.height !== undefined) {
            this.height = data.height;
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
    }
}
