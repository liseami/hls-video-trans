"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveAttract = void 0;
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
const NumberUtils_js_1 = require("../../../../Utils/NumberUtils.js");
class MoveAttract {
    constructor() {
        this.distance = 200;
        this.enable = false;
        this.rotate = {
            x: 3000,
            y: 3000,
        };
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = (0, NumberUtils_js_1.setRangeValue)(data.distance);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.rotate) {
            const rotateX = data.rotate.x;
            if (rotateX !== undefined) {
                this.rotate.x = rotateX;
            }
            const rotateY = data.rotate.y;
            if (rotateY !== undefined) {
                this.rotate.y = rotateY;
            }
        }
    }
}
exports.MoveAttract = MoveAttract;
