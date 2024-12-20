"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
const engine_1 = require("@tsparticles/engine");
const EmitterLife_js_1 = require("./EmitterLife.js");
const EmitterRate_js_1 = require("./EmitterRate.js");
const EmitterShape_js_1 = require("./EmitterShape.js");
const EmitterSize_js_1 = require("./EmitterSize.js");
class Emitter {
    constructor() {
        this.autoPlay = true;
        this.fill = true;
        this.life = new EmitterLife_js_1.EmitterLife();
        this.rate = new EmitterRate_js_1.EmitterRate();
        this.shape = new EmitterShape_js_1.EmitterShape();
        this.startCount = 0;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }
        if (data.size !== undefined) {
            if (!this.size) {
                this.size = new EmitterSize_js_1.EmitterSize();
            }
            this.size.load(data.size);
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        this.domId = data.domId;
        if (data.fill !== undefined) {
            this.fill = data.fill;
        }
        this.life.load(data.life);
        this.name = data.name;
        this.particles = (0, engine_1.executeOnSingleOrMultiple)(data.particles, particles => {
            return (0, engine_1.deepExtend)({}, particles);
        });
        this.rate.load(data.rate);
        this.shape.load(data.shape);
        if (data.position !== undefined) {
            this.position = {};
            if (data.position.x !== undefined) {
                this.position.x = (0, engine_1.setRangeValue)(data.position.x);
            }
            if (data.position.y !== undefined) {
                this.position.y = (0, engine_1.setRangeValue)(data.position.y);
            }
        }
        if (data.spawnColor !== undefined) {
            if (this.spawnColor === undefined) {
                this.spawnColor = new engine_1.AnimatableColor();
            }
            this.spawnColor.load(data.spawnColor);
        }
        if (data.startCount !== undefined) {
            this.startCount = data.startCount;
        }
    }
}
exports.Emitter = Emitter;
