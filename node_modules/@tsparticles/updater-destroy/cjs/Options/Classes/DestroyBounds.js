"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestroyBounds = void 0;
const engine_1 = require("@tsparticles/engine");
class DestroyBounds {
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.bottom !== undefined) {
            this.bottom = (0, engine_1.setRangeValue)(data.bottom);
        }
        if (data.left !== undefined) {
            this.left = (0, engine_1.setRangeValue)(data.left);
        }
        if (data.right !== undefined) {
            this.right = (0, engine_1.setRangeValue)(data.right);
        }
        if (data.top !== undefined) {
            this.top = (0, engine_1.setRangeValue)(data.top);
        }
    }
}
exports.DestroyBounds = DestroyBounds;
