"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitRate = void 0;
const engine_1 = require("@tsparticles/engine");
class SplitRate extends engine_1.ValueWithRandom {
    constructor() {
        super();
        this.value = { min: 4, max: 9 };
    }
}
exports.SplitRate = SplitRate;
