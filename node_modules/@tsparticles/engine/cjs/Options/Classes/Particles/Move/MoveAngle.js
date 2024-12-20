"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveAngle = void 0;
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
const NumberUtils_js_1 = require("../../../../Utils/NumberUtils.js");
class MoveAngle {
    constructor() {
        this.offset = 0;
        this.value = 90;
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.offset !== undefined) {
            this.offset = (0, NumberUtils_js_1.setRangeValue)(data.offset);
        }
        if (data.value !== undefined) {
            this.value = (0, NumberUtils_js_1.setRangeValue)(data.value);
        }
    }
}
exports.MoveAngle = MoveAngle;
