"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
const Utils_js_1 = require("../../../../Utils/Utils.js");
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
class Shape {
    constructor() {
        this.close = true;
        this.fill = true;
        this.options = {};
        this.type = "circle";
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        const options = data.options;
        if (options !== undefined) {
            for (const shape in options) {
                const item = options[shape];
                if (item) {
                    this.options[shape] = (0, Utils_js_1.deepExtend)(this.options[shape] ?? {}, item);
                }
            }
        }
        if (data.close !== undefined) {
            this.close = data.close;
        }
        if (data.fill !== undefined) {
            this.fill = data.fill;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
exports.Shape = Shape;
