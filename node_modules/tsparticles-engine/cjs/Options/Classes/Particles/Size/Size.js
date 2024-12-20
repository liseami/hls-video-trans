"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Size = void 0;
const SizeAnimation_1 = require("./SizeAnimation");
const ValueWithRandom_1 = require("../../ValueWithRandom");
const NumberUtils_1 = require("../../../../Utils/NumberUtils");
class Size extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.animation = new SizeAnimation_1.SizeAnimation();
        this.random.minimumValue = 1;
        this.value = 3;
    }
    get anim() {
        return this.animation;
    }
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        const animation = data.animation ?? data.anim;
        if (animation !== undefined) {
            this.animation.load(animation);
            this.value = (0, NumberUtils_1.setRangeValue)(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
    }
}
exports.Size = Size;
