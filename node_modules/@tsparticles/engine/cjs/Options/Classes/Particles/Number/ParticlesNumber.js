"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticlesNumber = void 0;
const ParticlesDensity_js_1 = require("./ParticlesDensity.js");
const ParticlesNumberLimit_js_1 = require("./ParticlesNumberLimit.js");
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
class ParticlesNumber {
    constructor() {
        this.density = new ParticlesDensity_js_1.ParticlesDensity();
        this.limit = new ParticlesNumberLimit_js_1.ParticlesNumberLimit();
        this.value = 0;
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        this.density.load(data.density);
        this.limit.load(data.limit);
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
exports.ParticlesNumber = ParticlesNumber;
