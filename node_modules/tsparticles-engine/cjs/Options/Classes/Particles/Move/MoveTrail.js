"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveTrail = void 0;
const MoveTrailFill_1 = require("./MoveTrailFill");
class MoveTrail {
    constructor() {
        this.enable = false;
        this.length = 10;
        this.fill = new MoveTrailFill_1.MoveTrailFill();
    }
    get fillColor() {
        return this.fill.color;
    }
    set fillColor(value) {
        this.fill.load({ color: value });
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.fill !== undefined || data.fillColor !== undefined) {
            this.fill.load(data.fill || { color: data.fillColor });
        }
        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}
exports.MoveTrail = MoveTrail;
