"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RgbColorManager = void 0;
const engine_1 = require("@tsparticles/engine");
var RgbIndexes;
(function (RgbIndexes) {
    RgbIndexes[RgbIndexes["r"] = 1] = "r";
    RgbIndexes[RgbIndexes["g"] = 2] = "g";
    RgbIndexes[RgbIndexes["b"] = 3] = "b";
    RgbIndexes[RgbIndexes["a"] = 5] = "a";
})(RgbIndexes || (RgbIndexes = {}));
class RgbColorManager {
    constructor() {
        this.key = "rgb";
        this.stringPrefix = "rgb";
    }
    handleColor(color) {
        const colorValue = color.value, rgbColor = colorValue.rgb ?? color.value;
        if (rgbColor.r !== undefined) {
            return rgbColor;
        }
    }
    handleRangeColor(color) {
        const colorValue = color.value, rgbColor = colorValue.rgb ?? color.value;
        if (rgbColor.r !== undefined) {
            return {
                r: (0, engine_1.getRangeValue)(rgbColor.r),
                g: (0, engine_1.getRangeValue)(rgbColor.g),
                b: (0, engine_1.getRangeValue)(rgbColor.b),
            };
        }
    }
    parseString(input) {
        if (!input.startsWith(this.stringPrefix)) {
            return;
        }
        const regex = /rgba?\(\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i, result = regex.exec(input), radix = 10, minLength = 4, defaultAlpha = 1;
        return result
            ? {
                a: result.length > minLength ? (0, engine_1.parseAlpha)(result[RgbIndexes.a]) : defaultAlpha,
                b: parseInt(result[RgbIndexes.b], radix),
                g: parseInt(result[RgbIndexes.g], radix),
                r: parseInt(result[RgbIndexes.r], radix),
            }
            : undefined;
    }
}
exports.RgbColorManager = RgbColorManager;
