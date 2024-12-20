import { getRangeValue, parseAlpha } from "./NumberUtils";
export class RgbColorManager {
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
                r: getRangeValue(rgbColor.r),
                g: getRangeValue(rgbColor.g),
                b: getRangeValue(rgbColor.b),
            };
        }
    }
    parseString(input) {
        if (!input.startsWith(this.stringPrefix)) {
            return;
        }
        const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.%]+)\s*)?\)/i, result = regex.exec(input);
        return result
            ? {
                a: result.length > 4 ? parseAlpha(result[5]) : 1,
                b: parseInt(result[3], 10),
                g: parseInt(result[2], 10),
                r: parseInt(result[1], 10),
            }
            : undefined;
    }
}
