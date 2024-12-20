(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../OptionsColor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BackgroundMaskCover = void 0;
    const OptionsColor_1 = require("../OptionsColor");
    class BackgroundMaskCover {
        constructor() {
            this.color = new OptionsColor_1.OptionsColor();
            this.color.value = "#fff";
            this.opacity = 1;
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.color !== undefined) {
                this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
            }
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
        }
    }
    exports.BackgroundMaskCover = BackgroundMaskCover;
});
