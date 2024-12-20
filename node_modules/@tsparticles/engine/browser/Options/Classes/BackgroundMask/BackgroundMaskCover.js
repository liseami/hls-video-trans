import { OptionsColor } from "../OptionsColor.js";
import { isNull } from "../../../Utils/TypeUtils.js";
export class BackgroundMaskCover {
    constructor() {
        this.opacity = 1;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }
        if (data.image !== undefined) {
            this.image = data.image;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
