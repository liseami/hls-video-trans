(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./AnimationOptions", "./Random", "../../Utils/Utils", "../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RangedAnimationValueWithRandom = exports.AnimationValueWithRandom = exports.ValueWithRandom = void 0;
    const AnimationOptions_1 = require("./AnimationOptions");
    const Random_1 = require("./Random");
    const Utils_1 = require("../../Utils/Utils");
    const NumberUtils_1 = require("../../Utils/NumberUtils");
    class ValueWithRandom {
        constructor() {
            this.random = new Random_1.Random();
            this.value = 0;
        }
        load(data) {
            if (!data) {
                return;
            }
            if ((0, Utils_1.isBoolean)(data.random)) {
                this.random.enable = data.random;
            }
            else {
                this.random.load(data.random);
            }
            if (data.value !== undefined) {
                this.value = (0, NumberUtils_1.setRangeValue)(data.value, this.random.enable ? this.random.minimumValue : undefined);
            }
        }
    }
    exports.ValueWithRandom = ValueWithRandom;
    class AnimationValueWithRandom extends ValueWithRandom {
        constructor() {
            super();
            this.animation = new AnimationOptions_1.AnimationOptions();
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
            }
        }
    }
    exports.AnimationValueWithRandom = AnimationValueWithRandom;
    class RangedAnimationValueWithRandom extends AnimationValueWithRandom {
        constructor() {
            super();
            this.animation = new AnimationOptions_1.RangedAnimationOptions();
        }
        load(data) {
            super.load(data);
            if (!data) {
                return;
            }
            const animation = data.animation ?? data.anim;
            if (animation !== undefined) {
                this.value = (0, NumberUtils_1.setRangeValue)(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
            }
        }
    }
    exports.RangedAnimationValueWithRandom = RangedAnimationValueWithRandom;
});
