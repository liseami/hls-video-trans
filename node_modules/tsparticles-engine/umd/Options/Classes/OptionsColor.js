(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OptionsColor = void 0;
    const Utils_1 = require("../../Utils/Utils");
    class OptionsColor {
        constructor() {
            this.value = "";
        }
        static create(source, data) {
            const color = new OptionsColor();
            color.load(source);
            if (data !== undefined) {
                if ((0, Utils_1.isString)(data) || (0, Utils_1.isArray)(data)) {
                    color.load({ value: data });
                }
                else {
                    color.load(data);
                }
            }
            return color;
        }
        load(data) {
            if (data?.value === undefined) {
                return;
            }
            this.value = data.value;
        }
    }
    exports.OptionsColor = OptionsColor;
});
