(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./OpacityAnimation.js", "../../ValueWithRandom.js", "../../../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Opacity = void 0;
    const OpacityAnimation_js_1 = require("./OpacityAnimation.js");
    const ValueWithRandom_js_1 = require("../../ValueWithRandom.js");
    const TypeUtils_js_1 = require("../../../../Utils/TypeUtils.js");
    class Opacity extends ValueWithRandom_js_1.RangedAnimationValueWithRandom {
        constructor() {
            super();
            this.animation = new OpacityAnimation_js_1.OpacityAnimation();
            this.value = 1;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            super.load(data);
            const animation = data.animation;
            if (animation !== undefined) {
                this.animation.load(animation);
            }
        }
    }
    exports.Opacity = Opacity;
});
