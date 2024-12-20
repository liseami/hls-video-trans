"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveGravity = void 0;
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
const NumberUtils_js_1 = require("../../../../Utils/NumberUtils.js");
class MoveGravity {
    constructor() {
        this.acceleration = 9.81;
        this.enable = false;
        this.inverse = false;
        this.maxSpeed = 50;
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.acceleration !== undefined) {
            this.acceleration = (0, NumberUtils_js_1.setRangeValue)(data.acceleration);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.inverse !== undefined) {
            this.inverse = data.inverse;
        }
        if (data.maxSpeed !== undefined) {
            this.maxSpeed = (0, NumberUtils_js_1.setRangeValue)(data.maxSpeed);
        }
    }
}
exports.MoveGravity = MoveGravity;
