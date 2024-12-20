"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticlesNumberLimit = void 0;
const LimitMode_js_1 = require("../../../../Enums/Modes/LimitMode.js");
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
class ParticlesNumberLimit {
    constructor() {
        this.mode = LimitMode_js_1.LimitMode.delete;
        this.value = 0;
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
exports.ParticlesNumberLimit = ParticlesNumberLimit;
