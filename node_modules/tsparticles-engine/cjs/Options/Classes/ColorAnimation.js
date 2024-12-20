"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorAnimation = void 0;
const NumberUtils_1 = require("../../Utils/NumberUtils");
class ColorAnimation {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.offset = 0;
        this.speed = 1;
        this.delay = 0;
        this.decay = 0;
        this.sync = true;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = (0, NumberUtils_1.setRangeValue)(data.count);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.offset !== undefined) {
            this.offset = (0, NumberUtils_1.setRangeValue)(data.offset);
        }
        if (data.speed !== undefined) {
            this.speed = (0, NumberUtils_1.setRangeValue)(data.speed);
        }
        if (data.decay !== undefined) {
            this.decay = (0, NumberUtils_1.setRangeValue)(data.decay);
        }
        if (data.delay !== undefined) {
            this.delay = (0, NumberUtils_1.setRangeValue)(data.delay);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.ColorAnimation = ColorAnimation;
