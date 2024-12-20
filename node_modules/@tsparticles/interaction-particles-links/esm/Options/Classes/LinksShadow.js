import { OptionsColor, isNull } from "@tsparticles/engine";
export class LinksShadow {
    constructor() {
        this.blur = 5;
        this.color = new OptionsColor();
        this.color.value = "#000";
        this.enable = false;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.blur !== undefined) {
            this.blur = data.blur;
        }
        this.color = OptionsColor.create(this.color, data.color);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
