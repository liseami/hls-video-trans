(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../Utils/TypeUtils.js", "./HslAnimation.js", "./OptionsColor.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnimatableColor = void 0;
    const TypeUtils_js_1 = require("../../Utils/TypeUtils.js");
    const HslAnimation_js_1 = require("./HslAnimation.js");
    const OptionsColor_js_1 = require("./OptionsColor.js");
    class AnimatableColor extends OptionsColor_js_1.OptionsColor {
        constructor() {
            super();
            this.animation = new HslAnimation_js_1.HslAnimation();
        }
        static create(source, data) {
            const color = new AnimatableColor();
            color.load(source);
            if (data !== undefined) {
                if ((0, TypeUtils_js_1.isString)(data) || (0, TypeUtils_js_1.isArray)(data)) {
                    color.load({ value: data });
                }
                else {
                    color.load(data);
                }
            }
            return color;
        }
        load(data) {
            super.load(data);
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            const colorAnimation = data.animation;
            if (colorAnimation !== undefined) {
                if (colorAnimation.enable !== undefined) {
                    this.animation.h.load(colorAnimation);
                }
                else {
                    this.animation.load(data.animation);
                }
            }
        }
    }
    exports.AnimatableColor = AnimatableColor;
});
