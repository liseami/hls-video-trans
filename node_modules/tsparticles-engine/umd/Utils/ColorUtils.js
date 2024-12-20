(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./NumberUtils", "./Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getHslAnimationFromHsl = exports.getHslFromAnimation = exports.getLinkRandomColor = exports.getLinkColor = exports.colorMix = exports.getStyleFromHsl = exports.getStyleFromRgb = exports.getRandomRgbColor = exports.hslaToRgba = exports.hslToRgb = exports.stringToRgb = exports.stringToAlpha = exports.rgbToHsl = exports.rangeColorToHsl = exports.colorToHsl = exports.colorToRgb = exports.rangeColorToRgb = exports.addColorManager = void 0;
    const NumberUtils_1 = require("./NumberUtils");
    const Utils_1 = require("./Utils");
    const randomColorValue = "random", midColorValue = "mid", colorManagers = new Map();
    function addColorManager(manager) {
        colorManagers.set(manager.key, manager);
    }
    exports.addColorManager = addColorManager;
    function hue2rgb(p, q, t) {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
    }
    function stringToRgba(input) {
        for (const [, manager] of colorManagers) {
            if (input.startsWith(manager.stringPrefix)) {
                return manager.parseString(input);
            }
        }
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i, hexFixed = input.replace(shorthandRegex, (_, r, g, b, a) => {
            return r + r + g + g + b + b + (a !== undefined ? a + a : "");
        }), regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i, result = regex.exec(hexFixed);
        return result
            ? {
                a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
                b: parseInt(result[3], 16),
                g: parseInt(result[2], 16),
                r: parseInt(result[1], 16),
            }
            : undefined;
    }
    function rangeColorToRgb(input, index, useIndex = true) {
        if (!input) {
            return;
        }
        const color = (0, Utils_1.isString)(input) ? { value: input } : input;
        if ((0, Utils_1.isString)(color.value)) {
            return colorToRgb(color.value, index, useIndex);
        }
        if ((0, Utils_1.isArray)(color.value)) {
            return rangeColorToRgb({
                value: (0, Utils_1.itemFromArray)(color.value, index, useIndex),
            });
        }
        for (const [, manager] of colorManagers) {
            const res = manager.handleRangeColor(color);
            if (res) {
                return res;
            }
        }
    }
    exports.rangeColorToRgb = rangeColorToRgb;
    function colorToRgb(input, index, useIndex = true) {
        if (!input) {
            return;
        }
        const color = (0, Utils_1.isString)(input) ? { value: input } : input;
        if ((0, Utils_1.isString)(color.value)) {
            return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
        }
        if ((0, Utils_1.isArray)(color.value)) {
            return colorToRgb({
                value: (0, Utils_1.itemFromArray)(color.value, index, useIndex),
            });
        }
        for (const [, manager] of colorManagers) {
            const res = manager.handleColor(color);
            if (res) {
                return res;
            }
        }
    }
    exports.colorToRgb = colorToRgb;
    function colorToHsl(color, index, useIndex = true) {
        const rgb = colorToRgb(color, index, useIndex);
        return rgb ? rgbToHsl(rgb) : undefined;
    }
    exports.colorToHsl = colorToHsl;
    function rangeColorToHsl(color, index, useIndex = true) {
        const rgb = rangeColorToRgb(color, index, useIndex);
        return rgb ? rgbToHsl(rgb) : undefined;
    }
    exports.rangeColorToHsl = rangeColorToHsl;
    function rgbToHsl(color) {
        const r1 = color.r / 255, g1 = color.g / 255, b1 = color.b / 255, max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1), res = {
            h: 0,
            l: (max + min) / 2,
            s: 0,
        };
        if (max !== min) {
            res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
            res.h =
                r1 === max
                    ? (g1 - b1) / (max - min)
                    : (res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min));
        }
        res.l *= 100;
        res.s *= 100;
        res.h *= 60;
        if (res.h < 0) {
            res.h += 360;
        }
        if (res.h >= 360) {
            res.h -= 360;
        }
        return res;
    }
    exports.rgbToHsl = rgbToHsl;
    function stringToAlpha(input) {
        return stringToRgba(input)?.a;
    }
    exports.stringToAlpha = stringToAlpha;
    function stringToRgb(input) {
        return stringToRgba(input);
    }
    exports.stringToRgb = stringToRgb;
    function hslToRgb(hsl) {
        const result = { b: 0, g: 0, r: 0 }, hslPercent = {
            h: hsl.h / 360,
            l: hsl.l / 100,
            s: hsl.s / 100,
        };
        if (!hslPercent.s) {
            result.r = result.g = result.b = hslPercent.l;
        }
        else {
            const q = hslPercent.l < 0.5
                ? hslPercent.l * (1 + hslPercent.s)
                : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s, p = 2 * hslPercent.l - q;
            result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
            result.g = hue2rgb(p, q, hslPercent.h);
            result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
        }
        result.r = Math.floor(result.r * 255);
        result.g = Math.floor(result.g * 255);
        result.b = Math.floor(result.b * 255);
        return result;
    }
    exports.hslToRgb = hslToRgb;
    function hslaToRgba(hsla) {
        const rgbResult = hslToRgb(hsla);
        return {
            a: hsla.a,
            b: rgbResult.b,
            g: rgbResult.g,
            r: rgbResult.r,
        };
    }
    exports.hslaToRgba = hslaToRgba;
    function getRandomRgbColor(min) {
        const fixedMin = min ?? 0;
        return {
            b: Math.floor((0, NumberUtils_1.randomInRange)((0, NumberUtils_1.setRangeValue)(fixedMin, 256))),
            g: Math.floor((0, NumberUtils_1.randomInRange)((0, NumberUtils_1.setRangeValue)(fixedMin, 256))),
            r: Math.floor((0, NumberUtils_1.randomInRange)((0, NumberUtils_1.setRangeValue)(fixedMin, 256))),
        };
    }
    exports.getRandomRgbColor = getRandomRgbColor;
    function getStyleFromRgb(color, opacity) {
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity ?? 1})`;
    }
    exports.getStyleFromRgb = getStyleFromRgb;
    function getStyleFromHsl(color, opacity) {
        return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity ?? 1})`;
    }
    exports.getStyleFromHsl = getStyleFromHsl;
    function colorMix(color1, color2, size1, size2) {
        let rgb1 = color1, rgb2 = color2;
        if (rgb1.r === undefined) {
            rgb1 = hslToRgb(color1);
        }
        if (rgb2.r === undefined) {
            rgb2 = hslToRgb(color2);
        }
        return {
            b: (0, NumberUtils_1.mix)(rgb1.b, rgb2.b, size1, size2),
            g: (0, NumberUtils_1.mix)(rgb1.g, rgb2.g, size1, size2),
            r: (0, NumberUtils_1.mix)(rgb1.r, rgb2.r, size1, size2),
        };
    }
    exports.colorMix = colorMix;
    function getLinkColor(p1, p2, linkColor) {
        if (linkColor === randomColorValue) {
            return getRandomRgbColor();
        }
        else if (linkColor === midColorValue) {
            const sourceColor = p1.getFillColor() ?? p1.getStrokeColor(), destColor = p2?.getFillColor() ?? p2?.getStrokeColor();
            if (sourceColor && destColor && p2) {
                return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
            }
            else {
                const hslColor = sourceColor ?? destColor;
                if (hslColor) {
                    return hslToRgb(hslColor);
                }
            }
        }
        else {
            return linkColor;
        }
    }
    exports.getLinkColor = getLinkColor;
    function getLinkRandomColor(optColor, blink, consent) {
        const color = (0, Utils_1.isString)(optColor) ? optColor : optColor.value;
        if (color === randomColorValue) {
            if (consent) {
                return rangeColorToRgb({
                    value: color,
                });
            }
            if (blink) {
                return randomColorValue;
            }
            return midColorValue;
        }
        else if (color === midColorValue) {
            return midColorValue;
        }
        else {
            return rangeColorToRgb({
                value: color,
            });
        }
    }
    exports.getLinkRandomColor = getLinkRandomColor;
    function getHslFromAnimation(animation) {
        return animation !== undefined
            ? {
                h: animation.h.value,
                s: animation.s.value,
                l: animation.l.value,
            }
            : undefined;
    }
    exports.getHslFromAnimation = getHslFromAnimation;
    function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
        const resColor = {
            h: {
                enable: false,
                value: hsl.h,
            },
            s: {
                enable: false,
                value: hsl.s,
            },
            l: {
                enable: false,
                value: hsl.l,
            },
        };
        if (animationOptions) {
            setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
            setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
            setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
        }
        return resColor;
    }
    exports.getHslAnimationFromHsl = getHslAnimationFromHsl;
    function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
        colorValue.enable = colorAnimation.enable;
        if (colorValue.enable) {
            colorValue.velocity = ((0, NumberUtils_1.getRangeValue)(colorAnimation.speed) / 100) * reduceFactor;
            colorValue.decay = 1 - (0, NumberUtils_1.getRangeValue)(colorAnimation.decay);
            colorValue.status = "increasing";
            colorValue.loops = 0;
            colorValue.maxLoops = (0, NumberUtils_1.getRangeValue)(colorAnimation.count);
            colorValue.time = 0;
            colorValue.delayTime = (0, NumberUtils_1.getRangeValue)(colorAnimation.delay) * 1000;
            if (!colorAnimation.sync) {
                colorValue.velocity *= (0, NumberUtils_1.getRandom)();
                colorValue.value *= (0, NumberUtils_1.getRandom)();
            }
            colorValue.initialValue = colorValue.value;
        }
        else {
            colorValue.velocity = 0;
        }
    }
});
