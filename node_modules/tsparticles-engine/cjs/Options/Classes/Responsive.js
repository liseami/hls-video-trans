"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responsive = void 0;
const Utils_1 = require("../../Utils/Utils");
class Responsive {
    constructor() {
        this.maxWidth = Infinity;
        this.options = {};
        this.mode = "canvas";
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.maxWidth !== undefined) {
            this.maxWidth = data.maxWidth;
        }
        if (data.mode !== undefined) {
            if (data.mode === "screen") {
                this.mode = "screen";
            }
            else {
                this.mode = "canvas";
            }
        }
        if (data.options !== undefined) {
            this.options = (0, Utils_1.deepExtend)({}, data.options);
        }
    }
}
exports.Responsive = Responsive;
