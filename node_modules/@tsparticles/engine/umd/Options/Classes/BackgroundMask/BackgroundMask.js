(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../Utils/TypeUtils.js", "./BackgroundMaskCover.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BackgroundMask = void 0;
    const TypeUtils_js_1 = require("../../../Utils/TypeUtils.js");
    const BackgroundMaskCover_js_1 = require("./BackgroundMaskCover.js");
    class BackgroundMask {
        constructor() {
            this.composite = "destination-out";
            this.cover = new BackgroundMaskCover_js_1.BackgroundMaskCover();
            this.enable = false;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (data.composite !== undefined) {
                this.composite = data.composite;
            }
            if (data.cover !== undefined) {
                const cover = data.cover, color = ((0, TypeUtils_js_1.isString)(data.cover) ? { color: data.cover } : data.cover);
                this.cover.load(cover.color !== undefined || cover.image !== undefined ? cover : { color: color });
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
        }
    }
    exports.BackgroundMask = BackgroundMask;
});
