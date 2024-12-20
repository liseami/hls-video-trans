(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./AnimationOptions.js", "../../Utils/TypeUtils.js", "../../Utils/NumberUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RangedAnimationValueWithRandom = exports.AnimationValueWithRandom = exports.ValueWithRandom = void 0;
    const AnimationOptions_js_1 = require("./AnimationOptions.js");
    const TypeUtils_js_1 = require("../../Utils/TypeUtils.js");
    const NumberUtils_js_1 = require("../../Utils/NumberUtils.js");
    class ValueWithRandom {
        constructor() {
            this.value = 0;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (!(0, TypeUtils_js_1.isNull)(data.value)) {
                this.value = (0, NumberUtils_js_1.setRangeValue)(data.value);
            }
        }
    }
    exports.ValueWithRandom = ValueWithRandom;
    class AnimationValueWithRandom extends ValueWithRandom {
        constructor() {
            super();
            this.animation = new AnimationOptions_js_1.AnimationOptions();
        }
        load(data) {
            super.load(data);
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            const animation = data.animation;
            if (animation !== undefined) {
                this.animation.load(animation);
            }
        }
    }
    exports.AnimationValueWithRandom = AnimationValueWithRandom;
    class RangedAnimationValueWithRandom extends AnimationValueWithRandom {
        constructor() {
            super();
            this.animation = new AnimationOptions_js_1.RangedAnimationOptions();
        }
        load(data) {
            super.load(data);
        }
    }
    exports.RangedAnimationValueWithRandom = RangedAnimationValueWithRandom;
});
