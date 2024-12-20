"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticlesDensity = void 0;
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
class ParticlesDensity {
    constructor() {
        this.enable = false;
        this.width = 1920;
        this.height = 1080;
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const width = data.width;
        if (width !== undefined) {
            this.width = width;
        }
        const height = data.height;
        if (height !== undefined) {
            this.height = height;
        }
    }
}
exports.ParticlesDensity = ParticlesDensity;
