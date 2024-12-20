"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Remove = void 0;
const engine_1 = require("@tsparticles/engine");
class Remove {
    constructor() {
        this.quantity = 2;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        const quantity = data.quantity;
        if (quantity !== undefined) {
            this.quantity = (0, engine_1.setRangeValue)(quantity);
        }
    }
}
exports.Remove = Remove;
