"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionsAbsorb = void 0;
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
class CollisionsAbsorb {
    constructor() {
        this.speed = 2;
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
exports.CollisionsAbsorb = CollisionsAbsorb;
