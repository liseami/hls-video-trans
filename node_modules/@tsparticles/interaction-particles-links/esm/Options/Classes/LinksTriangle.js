import { OptionsColor, isNull } from "@tsparticles/engine";
export class LinksTriangle {
    constructor() {
        this.enable = false;
        this.frequency = 1;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
