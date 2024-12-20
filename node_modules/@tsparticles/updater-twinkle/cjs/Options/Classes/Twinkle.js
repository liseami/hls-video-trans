"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Twinkle = void 0;
const engine_1 = require("@tsparticles/engine");
const TwinkleValues_js_1 = require("./TwinkleValues.js");
class Twinkle {
    constructor() {
        this.lines = new TwinkleValues_js_1.TwinkleValues();
        this.particles = new TwinkleValues_js_1.TwinkleValues();
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        this.lines.load(data.lines);
        this.particles.load(data.particles);
    }
}
exports.Twinkle = Twinkle;
