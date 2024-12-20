"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HslColorManager = void 0;
const engine_1 = require("@tsparticles/engine");
var HslIndexes;
(function (HslIndexes) {
    HslIndexes[HslIndexes["h"] = 1] = "h";
    HslIndexes[HslIndexes["s"] = 2] = "s";
    HslIndexes[HslIndexes["l"] = 3] = "l";
    HslIndexes[HslIndexes["a"] = 5] = "a";
})(HslIndexes || (HslIndexes = {}));
class HslColorManager {
    constructor() {
        this.key = "hsl";
        this.stringPrefix = "hsl";
    }
    handleColor(color) {
        const colorValue = color.value, hslColor = colorValue.hsl ?? color.value;
        if (hslColor.h !== undefined && hslColor.s !== undefined && hslColor.l !== undefined) {
            return (0, engine_1.hslToRgb)(hslColor);
        }
    }
    handleRangeColor(color) {
        const colorValue = color.value, hslColor = colorValue.hsl ?? color.value;
        if (hslColor.h !== undefined && hslColor.l !== undefined) {
            return (0, engine_1.hslToRgb)({
                h: (0, engine_1.getRangeValue)(hslColor.h),
                l: (0, engine_1.getRangeValue)(hslColor.l),
                s: (0, engine_1.getRangeValue)(hslColor.s),
            });
        }
    }
    parseString(input) {
        if (!input.startsWith("hsl")) {
            return;
        }
        const regex = /hsla?\(\s*(\d+)\s*[\s,]\s*(\d+)%\s*[\s,]\s*(\d+)%\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i, result = regex.exec(input), minLength = 4, defaultAlpha = 1, radix = 10;
        return result
            ? (0, engine_1.hslaToRgba)({
                a: result.length > minLength ? (0, engine_1.parseAlpha)(result[HslIndexes.a]) : defaultAlpha,
                h: parseInt(result[HslIndexes.h], radix),
                l: parseInt(result[HslIndexes.l], radix),
                s: parseInt(result[HslIndexes.s], radix),
            })
            : undefined;
    }
}
exports.HslColorManager = HslColorManager;
