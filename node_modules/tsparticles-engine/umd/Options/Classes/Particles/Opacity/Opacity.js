(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./OpacityAnimation", "../../ValueWithRandom", "../../../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Opacity = void 0;
    const OpacityAnimation_1 = require("./OpacityAnimation");
    const ValueWithRandom_1 = require("../../ValueWithRandom");
    const NumberUtils_1 = require("../../../../Utils/NumberUtils");
    class Opacity extends ValueWithRandom_1.ValueWithRandom {
        constructor() {
            super();
            this.animation = new OpacityAnimation_1.OpacityAnimation();
            this.random.minimumValue = 0.1;
            this.value = 1;
        }
        get anim() {
            return this.animation;
        }
        set anim(value) {
            this.animation = value;
        }
        load(data) {
            if (!data) {
                return;
            }
            super.load(data);
            const animation = data.animation ?? data.anim;
            if (animation !== undefined) {
                this.animation.load(animation);
                this.value = (0, NumberUtils_1.setRangeValue)(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
            }
        }
    }
    exports.Opacity = Opacity;
});
