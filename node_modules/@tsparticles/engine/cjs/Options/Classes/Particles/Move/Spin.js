"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spin = void 0;
const Utils_js_1 = require("../../../../Utils/Utils.js");
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
const NumberUtils_js_1 = require("../../../../Utils/NumberUtils.js");
class Spin {
    constructor() {
        this.acceleration = 0;
        this.enable = false;
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
        if (data.position) {
            this.position = (0, Utils_js_1.deepExtend)({}, data.position);
        }
    }
}
exports.Spin = Spin;
