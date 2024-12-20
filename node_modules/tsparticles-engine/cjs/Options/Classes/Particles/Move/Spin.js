"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spin = void 0;
const Utils_1 = require("../../../../Utils/Utils");
const NumberUtils_1 = require("../../../../Utils/NumberUtils");
class Spin {
    constructor() {
        this.acceleration = 0;
        this.enable = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.acceleration !== undefined) {
            this.acceleration = (0, NumberUtils_1.setRangeValue)(data.acceleration);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.position) {
            this.position = (0, Utils_1.deepExtend)({}, data.position);
        }
    }
}
exports.Spin = Spin;
