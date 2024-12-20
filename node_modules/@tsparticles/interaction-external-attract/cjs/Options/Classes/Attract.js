"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attract = void 0;
const engine_1 = require("@tsparticles/engine");
class Attract {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.easing = engine_1.EasingType.easeOutQuad;
        this.factor = 1;
        this.maxSpeed = 50;
        this.speed = 1;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.easing !== undefined) {
            this.easing = data.easing;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.maxSpeed !== undefined) {
            this.maxSpeed = data.maxSpeed;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
exports.Attract = Attract;
