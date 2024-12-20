(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../OptionsColor.js", "../../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BackgroundMaskCover = void 0;
    const OptionsColor_js_1 = require("../OptionsColor.js");
    const TypeUtils_js_1 = require("../../../Utils/TypeUtils.js");
    class BackgroundMaskCover {
        constructor() {
            this.opacity = 1;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (data.color !== undefined) {
                this.color = OptionsColor_js_1.OptionsColor.create(this.color, data.color);
            }
            if (data.image !== undefined) {
                this.image = data.image;
            }
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
        }
    }
    exports.BackgroundMaskCover = BackgroundMaskCover;
});
