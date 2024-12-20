import { deepExtend } from "../../Utils/Utils";
export class ManualParticle {
    load(data) {
        if (!data) {
            return;
        }
        if (data.position) {
            this.position = {
                x: data.position.x ?? 50,
                y: data.position.y ?? 50,
                mode: data.position.mode ?? "percent",
            };
        }
        if (data.options) {
            this.options = deepExtend({}, data.options);
        }
    }
}
