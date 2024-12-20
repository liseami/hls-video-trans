(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./NumberUtils", "./ColorUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HslColorManager = void 0;
    const NumberUtils_1 = require("./NumberUtils");
    const ColorUtils_1 = require("./ColorUtils");
    class HslColorManager {
        constructor() {
            this.key = "hsl";
            this.stringPrefix = "hsl";
        }
        handleColor(color) {
            const colorValue = color.value, hslColor = colorValue.hsl ?? color.value;
            if (hslColor.h !== undefined && hslColor.s !== undefined && hslColor.l !== undefined) {
                return (0, ColorUtils_1.hslToRgb)(hslColor);
            }
        }
        handleRangeColor(color) {
            const colorValue = color.value, hslColor = colorValue.hsl ?? color.value;
            if (hslColor.h !== undefined && hslColor.l !== undefined) {
                return (0, ColorUtils_1.hslToRgb)({
                    h: (0, NumberUtils_1.getRangeValue)(hslColor.h),
                    l: (0, NumberUtils_1.getRangeValue)(hslColor.l),
                    s: (0, NumberUtils_1.getRangeValue)(hslColor.s),
                });
            }
        }
        parseString(input) {
            if (!input.startsWith("hsl")) {
                return;
            }
            const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.%]+)\s*)?\)/i, result = regex.exec(input);
            return result
                ? (0, ColorUtils_1.hslaToRgba)({
                    a: result.length > 4 ? (0, NumberUtils_1.parseAlpha)(result[5]) : 1,
                    h: parseInt(result[1], 10),
                    l: parseInt(result[3], 10),
                    s: parseInt(result[2], 10),
                })
                : undefined;
        }
    }
    exports.HslColorManager = HslColorManager;
});
