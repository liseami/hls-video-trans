"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Life = void 0;
const engine_1 = require("@tsparticles/engine");
const LifeDelay_js_1 = require("./LifeDelay.js");
const LifeDuration_js_1 = require("./LifeDuration.js");
class Life {
    constructor() {
        this.count = 0;
        this.delay = new LifeDelay_js_1.LifeDelay();
        this.duration = new LifeDuration_js_1.LifeDuration();
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        this.delay.load(data.delay);
        this.duration.load(data.duration);
    }
}
exports.Life = Life;
