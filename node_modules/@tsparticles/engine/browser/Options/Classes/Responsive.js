import { ResponsiveMode } from "../../Enums/Modes/ResponsiveMode.js";
import { deepExtend } from "../../Utils/Utils.js";
import { isNull } from "../../Utils/TypeUtils.js";
export class Responsive {
    constructor() {
        this.maxWidth = Infinity;
        this.options = {};
        this.mode = ResponsiveMode.canvas;
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (!isNull(data.maxWidth)) {
            this.maxWidth = data.maxWidth;
        }
        if (!isNull(data.mode)) {
            if (data.mode === ResponsiveMode.screen) {
                this.mode = ResponsiveMode.screen;
            }
            else {
                this.mode = ResponsiveMode.canvas;
            }
        }
        if (!isNull(data.options)) {
            this.options = deepExtend({}, data.options);
        }
    }
}
