"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bounce = void 0;
const engine_1 = require("@tsparticles/engine");
class Bounce {
    constructor() {
        this.distance = 200;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
    }
}
exports.Bounce = Bounce;
