import { isNull } from "../../../../Utils/TypeUtils.js";
import { setRangeValue } from "../../../../Utils/NumberUtils.js";
export class MoveAttract {
    constructor() {
        this.distance = 200;
        this.enable = false;
        this.rotate = {
            x: 3000,
            y: 3000,
        };
    }
    load(data) {
        if (isNull(data)) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = setRangeValue(data.distance);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.rotate) {
            const rotateX = data.rotate.x;
            if (rotateX !== undefined) {
                this.rotate.x = rotateX;
            }
            const rotateY = data.rotate.y;
            if (rotateY !== undefined) {
                this.rotate.y = rotateY;
            }
        }
    }
}
