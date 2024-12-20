"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovePath = void 0;
const ValueWithRandom_js_1 = require("../../../ValueWithRandom.js");
const Utils_js_1 = require("../../../../../Utils/Utils.js");
const TypeUtils_js_1 = require("../../../../../Utils/TypeUtils.js");
class MovePath {
    constructor() {
        this.clamp = true;
        this.delay = new ValueWithRandom_js_1.ValueWithRandom();
        this.enable = false;
        this.options = {};
    }
    load(data) {
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.clamp !== undefined) {
            this.clamp = data.clamp;
        }
        this.delay.load(data.delay);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.generator = data.generator;
        if (data.options) {
            this.options = (0, Utils_js_1.deepExtend)(this.options, data.options);
        }
    }
}
exports.MovePath = MovePath;
