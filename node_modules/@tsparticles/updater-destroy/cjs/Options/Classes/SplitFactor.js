"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitFactor = void 0;
const engine_1 = require("@tsparticles/engine");
class SplitFactor extends engine_1.ValueWithRandom {
    constructor() {
        super();
        this.value = 3;
    }
}
exports.SplitFactor = SplitFactor;
