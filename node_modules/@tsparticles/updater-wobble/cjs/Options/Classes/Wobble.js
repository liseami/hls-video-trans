"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wobble = void 0;
const engine_1 = require("@tsparticles/engine");
const WobbleSpeed_js_1 = require("./WobbleSpeed.js");
class Wobble {
    constructor() {
        this.distance = 5;
        this.enable = false;
        this.speed = new WobbleSpeed_js_1.WobbleSpeed();
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = (0, engine_1.setRangeValue)(data.distance);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            if ((0, engine_1.isNumber)(data.speed)) {
                this.speed.load({ angle: data.speed });
            }
            else {
                const rangeSpeed = data.speed;
                if (rangeSpeed.min !== undefined) {
                    this.speed.load({ angle: rangeSpeed });
                }
                else {
                    this.speed.load(data.speed);
                }
            }
        }
    }
}
exports.Wobble = Wobble;
