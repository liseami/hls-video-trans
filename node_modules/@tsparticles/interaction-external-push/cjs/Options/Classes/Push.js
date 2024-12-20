"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Push = void 0;
const engine_1 = require("@tsparticles/engine");
class Push {
    constructor() {
        this.default = true;
        this.groups = [];
        this.quantity = 4;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.default !== undefined) {
            this.default = data.default;
        }
        if (data.groups !== undefined) {
            this.groups = data.groups.map(t => t);
        }
        if (!this.groups.length) {
            this.default = true;
        }
        const quantity = data.quantity;
        if (quantity !== undefined) {
            this.quantity = (0, engine_1.setRangeValue)(quantity);
        }
    }
}
exports.Push = Push;
