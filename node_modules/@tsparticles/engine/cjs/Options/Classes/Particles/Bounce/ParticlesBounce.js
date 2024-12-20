"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticlesBounce = void 0;
const ParticlesBounceFactor_js_1 = require("./ParticlesBounceFactor.js");
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
class ParticlesBounce {
    constructor() {
        this.horizontal = new ParticlesBounceFactor_js_1.ParticlesBounceFactor();
        this.vertical = new ParticlesBounceFactor_js_1.ParticlesBounceFactor();
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        this.horizontal.load(data.horizontal);
        this.vertical.load(data.vertical);
    }
}
exports.ParticlesBounce = ParticlesBounce;
