"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionsOverlap = void 0;
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
class CollisionsOverlap {
    constructor() {
        this.enable = true;
        this.retries = 0;
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.retries !== undefined) {
            this.retries = data.retries;
        }
    }
}
exports.CollisionsOverlap = CollisionsOverlap;
