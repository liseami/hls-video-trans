"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundMask = void 0;
const BackgroundMaskCover_1 = require("./BackgroundMaskCover");
const Utils_1 = require("../../../Utils/Utils");
class BackgroundMask {
    constructor() {
        this.composite = "destination-out";
        this.cover = new BackgroundMaskCover_1.BackgroundMaskCover();
        this.enable = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.composite !== undefined) {
            this.composite = data.composite;
        }
        if (data.cover !== undefined) {
            const cover = data.cover;
            const color = ((0, Utils_1.isString)(data.cover) ? { color: data.cover } : data.cover);
            this.cover.load(cover.color !== undefined ? cover : { color: color });
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
exports.BackgroundMask = BackgroundMask;
