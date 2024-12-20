import { PixelMode } from "../../Enums/Modes/PixelMode.js";
import { deepExtend } from "../../Utils/Utils.js";
import { isNull } from "../../Utils/TypeUtils.js";
const defaultPosition = 50;
export class ManualParticle {
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.position) {
            this.position = {
                x: data.position.x ?? defaultPosition,
                y: data.position.y ?? defaultPosition,
                mode: data.position.mode ?? PixelMode.percent,
            };
        }
        if (data.options) {
            this.options = deepExtend({}, data.options);
        }
    }
}
