"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeDuration = void 0;
const engine_1 = require("@tsparticles/engine");
class LifeDuration extends engine_1.ValueWithRandom {
    constructor() {
        super();
        this.sync = false;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        super.load(data);
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.LifeDuration = LifeDuration;
