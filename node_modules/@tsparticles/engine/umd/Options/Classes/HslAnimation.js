(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ColorAnimation.js", "../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HslAnimation = void 0;
    const ColorAnimation_js_1 = require("./ColorAnimation.js");
    const TypeUtils_js_1 = require("../../Utils/TypeUtils.js");
    class HslAnimation {
        constructor() {
            this.h = new ColorAnimation_js_1.ColorAnimation();
            this.s = new ColorAnimation_js_1.ColorAnimation();
            this.l = new ColorAnimation_js_1.ColorAnimation();
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            this.h.load(data.h);
            this.s.load(data.s);
            this.l.load(data.l);
        }
    }
    exports.HslAnimation = HslAnimation;
});
