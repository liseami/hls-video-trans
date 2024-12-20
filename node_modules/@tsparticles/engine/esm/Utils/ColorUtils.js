import { clamp, getRandom, getRangeMax, getRangeMin, getRangeValue, mix, randomInRange, setRangeValue, } from "./NumberUtils.js";
import { isArray, isString } from "./TypeUtils.js";
import { millisecondsToSeconds, percentDenominator } from "../Core/Utils/Constants.js";
import { AnimationStatus } from "../Enums/AnimationStatus.js";
import { itemFromArray } from "./Utils.js";
const randomColorValue = "random", midColorValue = "mid";
function stringToRgba(engine, input) {
    if (!input) {
        return;
    }
    for (const manager of engine.colorManagers.values()) {
        if (input.startsWith(manager.stringPrefix)) {
            return manager.parseString(input);
        }
    }
}
export function rangeColorToRgb(engine, input, index, useIndex = true) {
    if (!input) {
        return;
    }
    const color = isString(input) ? { value: input } : input;
    if (isString(color.value)) {
        return colorToRgb(engine, color.value, index, useIndex);
    }
    if (isArray(color.value)) {
        return rangeColorToRgb(engine, {
            value: itemFromArray(color.value, index, useIndex),
        });
    }
    for (const manager of engine.colorManagers.values()) {
        const res = manager.handleRangeColor(color);
        if (res) {
            return res;
        }
    }
}
export function colorToRgb(engine, input, index, useIndex = true) {
    if (!input) {
        return;
    }
    const color = isString(input) ? { value: input } : input;
    if (isString(color.value)) {
        return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(engine, color.value);
    }
    if (isArray(color.value)) {
        return colorToRgb(engine, {
            value: itemFromArray(color.value, index, useIndex),
        });
    }
    for (const manager of engine.colorManagers.values()) {
        const res = manager.handleColor(color);
        if (res) {
            return res;
        }
    }
}
export function colorToHsl(engine, color, index, useIndex = true) {
    const rgb = colorToRgb(engine, color, index, useIndex);
    return rgb ? rgbToHsl(rgb) : undefined;
}
export function rangeColorToHsl(engine, color, index, useIndex = true) {
    const rgb = rangeColorToRgb(engine, color, index, useIndex);
    return rgb ? rgbToHsl(rgb) : undefined;
}
export function rgbToHsl(color) {
    const rgbMax = 255, hMax = 360, sMax = 100, lMax = 100, hMin = 0, sMin = 0, hPhase = 60, half = 0.5, double = 2, r1 = color.r / rgbMax, g1 = color.g / rgbMax, b1 = color.b / rgbMax, max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1), res = {
        h: hMin,
        l: (max + min) * half,
        s: sMin,
    };
    if (max !== min) {
        res.s = res.l < half ? (max - min) / (max + min) : (max - min) / (double - max - min);
        res.h =
            r1 === max
                ? (g1 - b1) / (max - min)
                : (res.h = g1 === max ? double + (b1 - r1) / (max - min) : double * double + (r1 - g1) / (max - min));
    }
    res.l *= lMax;
    res.s *= sMax;
    res.h *= hPhase;
    if (res.h < hMin) {
        res.h += hMax;
    }
    if (res.h >= hMax) {
        res.h -= hMax;
    }
    return res;
}
export function stringToAlpha(engine, input) {
    return stringToRgba(engine, input)?.a;
}
export function stringToRgb(engine, input) {
    return stringToRgba(engine, input);
}
export function hslToRgb(hsl) {
    const hMax = 360, sMax = 100, lMax = 100, sMin = 0, lMin = 0, h = ((hsl.h % hMax) + hMax) % hMax, s = Math.max(sMin, Math.min(sMax, hsl.s)), l = Math.max(lMin, Math.min(lMax, hsl.l)), hNormalized = h / hMax, sNormalized = s / sMax, lNormalized = l / lMax, rgbFactor = 255, triple = 3;
    if (s === sMin) {
        const grayscaleValue = Math.round(lNormalized * rgbFactor);
        return { r: grayscaleValue, g: grayscaleValue, b: grayscaleValue };
    }
    const half = 0.5, double = 2, channel = (temp1, temp2, temp3) => {
        const temp3Min = 0, temp3Max = 1, sextuple = 6;
        if (temp3 < temp3Min) {
            temp3++;
        }
        if (temp3 > temp3Max) {
            temp3--;
        }
        if (temp3 * sextuple < temp3Max) {
            return temp1 + (temp2 - temp1) * sextuple * temp3;
        }
        if (temp3 * double < temp3Max) {
            return temp2;
        }
        if (temp3 * triple < temp3Max * double) {
            const temp3Offset = double / triple;
            return temp1 + (temp2 - temp1) * (temp3Offset - temp3) * sextuple;
        }
        return temp1;
    }, sNormalizedOffset = 1, temp1 = lNormalized < half
        ? lNormalized * (sNormalizedOffset + sNormalized)
        : lNormalized + sNormalized - lNormalized * sNormalized, temp2 = double * lNormalized - temp1, phaseNumerator = 1, phaseThird = phaseNumerator / triple, red = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized + phaseThird)), green = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized)), blue = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized - phaseThird));
    return { r: Math.round(red), g: Math.round(green), b: Math.round(blue) };
}
export function hslaToRgba(hsla) {
    const rgbResult = hslToRgb(hsla);
    return {
        a: hsla.a,
        b: rgbResult.b,
        g: rgbResult.g,
        r: rgbResult.r,
    };
}
export function getRandomRgbColor(min) {
    const defaultMin = 0, fixedMin = min ?? defaultMin, rgbMax = 256;
    return {
        b: Math.floor(randomInRange(setRangeValue(fixedMin, rgbMax))),
        g: Math.floor(randomInRange(setRangeValue(fixedMin, rgbMax))),
        r: Math.floor(randomInRange(setRangeValue(fixedMin, rgbMax))),
    };
}
export function getStyleFromRgb(color, opacity) {
    const defaultOpacity = 1;
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity ?? defaultOpacity})`;
}
export function getStyleFromHsl(color, opacity) {
    const defaultOpacity = 1;
    return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity ?? defaultOpacity})`;
}
export function colorMix(color1, color2, size1, size2) {
    let rgb1 = color1, rgb2 = color2;
    if (rgb1.r === undefined) {
        rgb1 = hslToRgb(color1);
    }
    if (rgb2.r === undefined) {
        rgb2 = hslToRgb(color2);
    }
    return {
        b: mix(rgb1.b, rgb2.b, size1, size2),
        g: mix(rgb1.g, rgb2.g, size1, size2),
        r: mix(rgb1.r, rgb2.r, size1, size2),
    };
}
export function getLinkColor(p1, p2, linkColor) {
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
export function getLinkRandomColor(engine, optColor, blink, consent) {
    const color = isString(optColor) ? optColor : optColor.value;
    if (color === randomColorValue) {
        if (consent) {
            return rangeColorToRgb(engine, {
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
        return rangeColorToRgb(engine, {
            value: color,
        });
    }
}
export function getHslFromAnimation(animation) {
    return animation !== undefined
        ? {
            h: animation.h.value,
            s: animation.s.value,
            l: animation.l.value,
        }
        : undefined;
}
export function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
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
function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
    colorValue.enable = colorAnimation.enable;
    const defaultVelocity = 0, decayOffset = 1, defaultLoops = 0, defaultTime = 0;
    if (colorValue.enable) {
        colorValue.velocity = (getRangeValue(colorAnimation.speed) / percentDenominator) * reduceFactor;
        colorValue.decay = decayOffset - getRangeValue(colorAnimation.decay);
        colorValue.status = AnimationStatus.increasing;
        colorValue.loops = defaultLoops;
        colorValue.maxLoops = getRangeValue(colorAnimation.count);
        colorValue.time = defaultTime;
        colorValue.delayTime = getRangeValue(colorAnimation.delay) * millisecondsToSeconds;
        if (!colorAnimation.sync) {
            colorValue.velocity *= getRandom();
            colorValue.value *= getRandom();
        }
        colorValue.initialValue = colorValue.value;
        colorValue.offset = setRangeValue(colorAnimation.offset);
    }
    else {
        colorValue.velocity = defaultVelocity;
    }
}
export function updateColorValue(data, range, decrease, delta) {
    const minLoops = 0, minDelay = 0, identity = 1, minVelocity = 0, minOffset = 0, velocityFactor = 3.6;
    if (!data ||
        !data.enable ||
        ((data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops))) {
        return;
    }
    if (!data.time) {
        data.time = 0;
    }
    if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
        data.time += delta.value;
    }
    if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
        return;
    }
    const offset = data.offset ? randomInRange(data.offset) : minOffset, velocity = (data.velocity ?? minVelocity) * delta.factor + offset * velocityFactor, decay = data.decay ?? identity, max = getRangeMax(range), min = getRangeMin(range);
    if (!decrease || data.status === AnimationStatus.increasing) {
        data.value += velocity;
        if (data.value > max) {
            if (!data.loops) {
                data.loops = 0;
            }
            data.loops++;
            if (decrease) {
                data.status = AnimationStatus.decreasing;
            }
            else {
                data.value -= max;
            }
        }
    }
    else {
        data.value -= velocity;
        const minValue = 0;
        if (data.value < minValue) {
            if (!data.loops) {
                data.loops = 0;
            }
            data.loops++;
            data.status = AnimationStatus.increasing;
        }
    }
    if (data.velocity && decay !== identity) {
        data.velocity *= decay;
    }
    data.value = clamp(data.value, min, max);
}
export function updateColor(color, delta) {
    if (!color) {
        return;
    }
    const { h, s, l } = color;
    const ranges = {
        h: { min: 0, max: 360 },
        s: { min: 0, max: 100 },
        l: { min: 0, max: 100 },
    };
    if (h) {
        updateColorValue(h, ranges.h, false, delta);
    }
    if (s) {
        updateColorValue(s, ranges.s, true, delta);
    }
    if (l) {
        updateColorValue(l, ranges.l, true, delta);
    }
}
