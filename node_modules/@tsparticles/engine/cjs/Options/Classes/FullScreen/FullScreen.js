"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullScreen = void 0;
const TypeUtils_js_1 = require("../../../Utils/TypeUtils.js");
class FullScreen {
    constructor() {
        this.enable = true;
        this.zIndex = 0;
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.zIndex !== undefined) {
            this.zIndex = data.zIndex;
        }
    }
}
exports.FullScreen = FullScreen;
