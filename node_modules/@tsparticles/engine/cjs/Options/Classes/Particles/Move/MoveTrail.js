"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveTrail = void 0;
const MoveTrailFill_js_1 = require("./MoveTrailFill.js");
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
class MoveTrail {
    constructor() {
        this.enable = false;
        this.length = 10;
        this.fill = new MoveTrailFill_js_1.MoveTrailFill();
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.fill !== undefined) {
            this.fill.load(data.fill);
        }
        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}
exports.MoveTrail = MoveTrail;
