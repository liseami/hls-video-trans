"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticlesInteractorBase = void 0;
const InteractorType_js_1 = require("../../Enums/Types/InteractorType.js");
class ParticlesInteractorBase {
    constructor(container) {
        this.type = InteractorType_js_1.InteractorType.particles;
        this.container = container;
    }
}
exports.ParticlesInteractorBase = ParticlesInteractorBase;
