import { DestroyType } from "../../../../Enums/Types/DestroyType.js";
import { RangedAnimationOptions } from "../../AnimationOptions.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
export class SizeAnimation extends RangedAnimationOptions {
    constructor() {
        super();
        this.destroy = DestroyType.none;
        this.speed = 5;
    }
    load(data) {
        super.load(data);
        if (isNull(data)) {
            return;
        }
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
    }
}
