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
    exports.Shadow = void 0;
    const OptionsColor_1 = require("../OptionsColor");
    class Shadow {
        constructor() {
            this.blur = 0;
            this.color = new OptionsColor_1.OptionsColor();
            this.enable = false;
            this.offset = {
                x: 0,
                y: 0,
            };
            this.color.value = "#000";
        }
        load(data) {
            if (!data) {
                return;
            }
            if (data.blur !== undefined) {
                this.blur = data.blur;
            }
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.offset === undefined) {
                return;
            }
            if (data.offset.x !== undefined) {
                this.offset.x = data.offset.x;
            }
            if (data.offset.y !== undefined) {
                this.offset.y = data.offset.y;
            }
        }
    }
    exports.Shadow = Shadow;
});
