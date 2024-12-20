"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualParticle = void 0;
const Utils_1 = require("../../Utils/Utils");
class ManualParticle {
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
            this.options = (0, Utils_1.deepExtend)({}, data.options);
        }
    }
}
exports.ManualParticle = ManualParticle;
