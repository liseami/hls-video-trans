(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../Utils/TypeUtils.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OptionsColor = void 0;
    const TypeUtils_js_1 = require("../../Utils/TypeUtils.js");
    class OptionsColor {
        constructor() {
            this.value = "";
        }
        static create(source, data) {
            const color = new OptionsColor();
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
            if ((0, TypeUtils_js_1.isNull)(data)) {
                return;
            }
            if (!(0, TypeUtils_js_1.isNull)(data.value)) {
                this.value = data.value;
            }
        }
    }
    exports.OptionsColor = OptionsColor;
});
