(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../Enums/Modes/ResponsiveMode.js", "../../Utils/Utils.js", "../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Responsive = void 0;
    const ResponsiveMode_js_1 = require("../../Enums/Modes/ResponsiveMode.js");
    const Utils_js_1 = require("../../Utils/Utils.js");
    const TypeUtils_js_1 = require("../../Utils/TypeUtils.js");
    class Responsive {
        constructor() {
            this.maxWidth = Infinity;
            this.options = {};
            this.mode = ResponsiveMode_js_1.ResponsiveMode.canvas;
        }
        load(data) {
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (!(0, TypeUtils_js_1.isNull)(data.maxWidth)) {
                this.maxWidth = data.maxWidth;
            }
            if (!(0, TypeUtils_js_1.isNull)(data.mode)) {
                if (data.mode === ResponsiveMode_js_1.ResponsiveMode.screen) {
                    this.mode = ResponsiveMode_js_1.ResponsiveMode.screen;
                }
                else {
                    this.mode = ResponsiveMode_js_1.ResponsiveMode.canvas;
                }
            }
            if (!(0, TypeUtils_js_1.isNull)(data.options)) {
                this.options = (0, Utils_js_1.deepExtend)({}, data.options);
            }
        }
    }
    exports.Responsive = Responsive;
});
