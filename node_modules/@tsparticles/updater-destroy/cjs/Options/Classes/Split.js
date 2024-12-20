"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Split = void 0;
const engine_1 = require("@tsparticles/engine");
const SplitFactor_js_1 = require("./SplitFactor.js");
const SplitRate_js_1 = require("./SplitRate.js");
class Split {
    constructor() {
        this.count = 1;
        this.factor = new SplitFactor_js_1.SplitFactor();
        this.rate = new SplitRate_js_1.SplitRate();
        this.sizeOffset = true;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.color !== undefined) {
            this.color = engine_1.OptionsColor.create(this.color, data.color);
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        this.factor.load(data.factor);
        this.rate.load(data.rate);
        this.particles = (0, engine_1.executeOnSingleOrMultiple)(data.particles, particles => {
            return (0, engine_1.deepExtend)({}, particles);
        });
        if (data.sizeOffset !== undefined) {
            this.sizeOffset = data.sizeOffset;
        }
        if (data.colorOffset) {
            this.colorOffset = this.colorOffset ?? {};
            if (data.colorOffset.h !== undefined) {
                this.colorOffset.h = data.colorOffset.h;
            }
            if (data.colorOffset.s !== undefined) {
                this.colorOffset.s = data.colorOffset.s;
            }
            if (data.colorOffset.l !== undefined) {
                this.colorOffset.l = data.colorOffset.l;
            }
        }
    }
}
exports.Split = Split;
