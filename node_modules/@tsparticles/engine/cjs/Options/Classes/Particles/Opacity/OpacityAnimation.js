"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpacityAnimation = void 0;
const DestroyType_js_1 = require("../../../../Enums/Types/DestroyType.js");
const AnimationOptions_js_1 = require("../../AnimationOptions.js");
const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
class OpacityAnimation extends AnimationOptions_js_1.RangedAnimationOptions {
    constructor() {
        super();
        this.destroy = DestroyType_js_1.DestroyType.none;
        this.speed = 2;
    }
    load(data) {
        super.load(data);
        if ((0, TypeUtils_js_1.isNull)(data)) {
            return;
        }
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
    }
}
exports.OpacityAnimation = OpacityAnimation;
