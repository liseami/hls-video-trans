"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitterSize = void 0;
const engine_1 = require("@tsparticles/engine");
class EmitterSize {
    constructor() {
        this.mode = engine_1.PixelMode.percent;
        this.height = 0;
        this.width = 0;
    }
    load(data) {
        if ((0, engine_1.isNull)(data)) {
            return;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.height !== undefined) {
            this.height = data.height;
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
    }
}
exports.EmitterSize = EmitterSize;
