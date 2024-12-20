var RgbIndexes;
(function (RgbIndexes) {
    RgbIndexes[RgbIndexes["r"] = 1] = "r";
    RgbIndexes[RgbIndexes["g"] = 2] = "g";
    RgbIndexes[RgbIndexes["b"] = 3] = "b";
    RgbIndexes[RgbIndexes["a"] = 4] = "a";
})(RgbIndexes || (RgbIndexes = {}));
const shorthandHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i, hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i, hexRadix = 16, defaultAlpha = 1, alphaFactor = 0xff;
export class HexColorManager {
    constructor() {
        this.key = "hex";
        this.stringPrefix = "#";
    }
    handleColor(color) {
        return this._parseString(color.value);
    }
    handleRangeColor(color) {
        return this._parseString(color.value);
    }
    parseString(input) {
        return this._parseString(input);
    }
    _parseString(hexColor) {
        if (typeof hexColor !== "string") {
            return;
        }
        if (!hexColor?.startsWith(this.stringPrefix)) {
            return;
        }
        const hexFixed = hexColor.replace(shorthandHexRegex, (_, r, g, b, a) => {
            return r + r + g + g + b + b + (a !== undefined ? a + a : "");
        }), result = hexRegex.exec(hexFixed);
        return result
            ? {
                a: result[RgbIndexes.a] !== undefined
                    ? parseInt(result[RgbIndexes.a], hexRadix) / alphaFactor
                    : defaultAlpha,
                b: parseInt(result[RgbIndexes.b], hexRadix),
                g: parseInt(result[RgbIndexes.g], hexRadix),
                r: parseInt(result[RgbIndexes.r], hexRadix),
            }
            : undefined;
    }
}
