(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ColorAnimation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HslAnimation = void 0;
    const ColorAnimation_1 = require("./ColorAnimation");
    class HslAnimation {
        constructor() {
            this.h = new ColorAnimation_1.ColorAnimation();
            this.s = new ColorAnimation_1.ColorAnimation();
            this.l = new ColorAnimation_1.ColorAnimation();
        }
        load(data) {
            if (!data) {
                return;
            }
            this.h.load(data.h);
            this.s.load(data.s);
            this.l.load(data.l);
        }
    }
    exports.HslAnimation = HslAnimation;
});
