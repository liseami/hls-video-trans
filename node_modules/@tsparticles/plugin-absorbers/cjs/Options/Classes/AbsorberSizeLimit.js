"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsorberSizeLimit = void 0;
const engine_1 = require("@tsparticles/engine");
class AbsorberSizeLimit {
    constructor() {
        this.radius = 0;
        this.mass = 0;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.mass !== undefined) {
            this.mass = data.mass;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
exports.AbsorberSizeLimit = AbsorberSizeLimit;
