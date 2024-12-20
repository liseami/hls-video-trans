import { OptionsColor } from "../../OptionsColor.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
export class MoveTrailFill {
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
    }
}
