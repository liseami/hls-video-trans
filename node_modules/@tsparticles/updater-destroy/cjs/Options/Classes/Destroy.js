"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Destroy = void 0;
const engine_1 = require("@tsparticles/engine");
const DestroyBounds_js_1 = require("./DestroyBounds.js");
const DestroyMode_js_1 = require("../../Enums/DestroyMode.js");
const Split_js_1 = require("./Split.js");
class Destroy {
    constructor() {
        this.bounds = new DestroyBounds_js_1.DestroyBounds();
        this.mode = DestroyMode_js_1.DestroyMode.none;
        this.split = new Split_js_1.Split();
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.mode) {
            this.mode = data.mode;
        }
        if (data.bounds) {
            this.bounds.load(data.bounds);
        }
        this.split.load(data.split);
    }
}
exports.Destroy = Destroy;
