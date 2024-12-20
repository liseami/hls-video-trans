import { OptionsColor, executeOnSingleOrMultiple, isArray, isNull, } from "@tsparticles/engine";
export class BubbleBase {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.mix = false;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.mix !== undefined) {
            this.mix = data.mix;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.color !== undefined) {
            const sourceColor = isArray(this.color) ? undefined : this.color;
            this.color = executeOnSingleOrMultiple(data.color, color => {
                return OptionsColor.create(sourceColor, color);
            });
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
    }
}
