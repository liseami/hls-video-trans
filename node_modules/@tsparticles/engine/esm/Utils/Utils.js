import { clamp, collisionVelocity, getDistances, getRandom, getRangeMax, getRangeMin, getRangeValue, randomInRange, } from "./NumberUtils.js";
import { halfRandom, millisecondsToSeconds, percentDenominator } from "../Core/Utils/Constants.js";
import { isArray, isObject } from "./TypeUtils.js";
import { AnimationMode } from "../Enums/Modes/AnimationMode.js";
import { AnimationStatus } from "../Enums/AnimationStatus.js";
import { DestroyType } from "../Enums/Types/DestroyType.js";
import { OutModeDirection } from "../Enums/Directions/OutModeDirection.js";
import { PixelMode } from "../Enums/Modes/PixelMode.js";
import { StartValueType } from "../Enums/Types/StartValueType.js";
import { Vector } from "../Core/Utils/Vectors.js";
const _logger = {
    debug: console.debug,
    error: console.error,
    info: console.info,
    log: console.log,
    verbose: console.log,
    warning: console.warn,
};
export function setLogger(logger) {
    _logger.debug = logger.debug || _logger.debug;
    _logger.error = logger.error || _logger.error;
    _logger.info = logger.info || _logger.info;
    _logger.log = logger.log || _logger.log;
    _logger.verbose = logger.verbose || _logger.verbose;
    _logger.warning = logger.warning || _logger.warning;
}
export function getLogger() {
    return _logger;
}
function rectSideBounce(data) {
    const res = { bounced: false }, { pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor } = data, half = 0.5, minVelocity = 0;
    if (pOtherSide.min < rectOtherSide.min ||
        pOtherSide.min > rectOtherSide.max ||
        pOtherSide.max < rectOtherSide.min ||
        pOtherSide.max > rectOtherSide.max) {
        return res;
    }
    if ((pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) * half && velocity > minVelocity) ||
        (pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) * half && velocity < minVelocity)) {
        res.velocity = velocity * -factor;
        res.bounced = true;
    }
    return res;
}
function checkSelector(element, selectors) {
    const res = executeOnSingleOrMultiple(selectors, selector => {
        return element.matches(selector);
    });
    return isArray(res) ? res.some(t => t) : res;
}
export function isSsr() {
    return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}
export function hasMatchMedia() {
    return !isSsr() && typeof matchMedia !== "undefined";
}
export function safeMatchMedia(query) {
    if (!hasMatchMedia()) {
        return;
    }
    return matchMedia(query);
}
export function safeIntersectionObserver(callback) {
    if (isSsr() || typeof IntersectionObserver === "undefined") {
        return;
    }
    return new IntersectionObserver(callback);
}
export function safeMutationObserver(callback) {
    if (isSsr() || typeof MutationObserver === "undefined") {
        return;
    }
    return new MutationObserver(callback);
}
export function isInArray(value, array) {
    const invalidIndex = -1;
    return value === array || (isArray(array) && array.indexOf(value) > invalidIndex);
}
export async function loadFont(font, weight) {
    try {
        await document.fonts.load(`${weight ?? "400"} 36px '${font ?? "Verdana"}'`);
    }
    catch {
    }
}
export function arrayRandomIndex(array) {
    return Math.floor(getRandom() * array.length);
}
export function itemFromArray(array, index, useIndex = true) {
    return array[index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array)];
}
export function isPointInside(point, size, offset, radius, direction) {
    const minRadius = 0;
    return areBoundsInside(calculateBounds(point, radius ?? minRadius), size, offset, direction);
}
export function areBoundsInside(bounds, size, offset, direction) {
    let inside = true;
    if (!direction || direction === OutModeDirection.bottom) {
        inside = bounds.top < size.height + offset.x;
    }
    if (inside && (!direction || direction === OutModeDirection.left)) {
        inside = bounds.right > offset.x;
    }
    if (inside && (!direction || direction === OutModeDirection.right)) {
        inside = bounds.left < size.width + offset.y;
    }
    if (inside && (!direction || direction === OutModeDirection.top)) {
        inside = bounds.bottom > offset.y;
    }
    return inside;
}
export function calculateBounds(point, radius) {
    return {
        bottom: point.y + radius,
        left: point.x - radius,
        right: point.x + radius,
        top: point.y - radius,
    };
}
export function deepExtend(destination, ...sources) {
    for (const source of sources) {
        if (source === undefined || source === null) {
            continue;
        }
        if (!isObject(source)) {
            destination = source;
            continue;
        }
        const sourceIsArray = Array.isArray(source);
        if (sourceIsArray && (isObject(destination) || !destination || !Array.isArray(destination))) {
            destination = [];
        }
        else if (!sourceIsArray && (isObject(destination) || !destination || Array.isArray(destination))) {
            destination = {};
        }
        for (const key in source) {
            if (key === "__proto__") {
                continue;
            }
            const sourceDict = source, value = sourceDict[key], destDict = destination;
            destDict[key] =
                isObject(value) && Array.isArray(value)
                    ? value.map(v => deepExtend(destDict[key], v))
                    : deepExtend(destDict[key], value);
        }
    }
    return destination;
}
export function isDivModeEnabled(mode, divs) {
    return !!findItemFromSingleOrMultiple(divs, t => t.enable && isInArray(mode, t.mode));
}
export function divModeExecute(mode, divs, callback) {
    executeOnSingleOrMultiple(divs, div => {
        const divMode = div.mode, divEnabled = div.enable;
        if (divEnabled && isInArray(mode, divMode)) {
            singleDivModeExecute(div, callback);
        }
    });
}
export function singleDivModeExecute(div, callback) {
    const selectors = div.selectors;
    executeOnSingleOrMultiple(selectors, selector => {
        callback(selector, div);
    });
}
export function divMode(divs, element) {
    if (!element || !divs) {
        return;
    }
    return findItemFromSingleOrMultiple(divs, div => {
        return checkSelector(element, div.selectors);
    });
}
export function circleBounceDataFromParticle(p) {
    return {
        position: p.getPosition(),
        radius: p.getRadius(),
        mass: p.getMass(),
        velocity: p.velocity,
        factor: Vector.create(getRangeValue(p.options.bounce.horizontal.value), getRangeValue(p.options.bounce.vertical.value)),
    };
}
export function circleBounce(p1, p2) {
    const { x: xVelocityDiff, y: yVelocityDiff } = p1.velocity.sub(p2.velocity), [pos1, pos2] = [p1.position, p2.position], { dx: xDist, dy: yDist } = getDistances(pos2, pos1), minimumDistance = 0;
    if (xVelocityDiff * xDist + yVelocityDiff * yDist < minimumDistance) {
        return;
    }
    const angle = -Math.atan2(yDist, xDist), m1 = p1.mass, m2 = p2.mass, u1 = p1.velocity.rotate(angle), u2 = p2.velocity.rotate(angle), v1 = collisionVelocity(u1, u2, m1, m2), v2 = collisionVelocity(u2, u1, m1, m2), vFinal1 = v1.rotate(-angle), vFinal2 = v2.rotate(-angle);
    p1.velocity.x = vFinal1.x * p1.factor.x;
    p1.velocity.y = vFinal1.y * p1.factor.y;
    p2.velocity.x = vFinal2.x * p2.factor.x;
    p2.velocity.y = vFinal2.y * p2.factor.y;
}
export function rectBounce(particle, divBounds) {
    const pPos = particle.getPosition(), size = particle.getRadius(), bounds = calculateBounds(pPos, size), bounceOptions = particle.options.bounce, resH = rectSideBounce({
        pSide: {
            min: bounds.left,
            max: bounds.right,
        },
        pOtherSide: {
            min: bounds.top,
            max: bounds.bottom,
        },
        rectSide: {
            min: divBounds.left,
            max: divBounds.right,
        },
        rectOtherSide: {
            min: divBounds.top,
            max: divBounds.bottom,
        },
        velocity: particle.velocity.x,
        factor: getRangeValue(bounceOptions.horizontal.value),
    });
    if (resH.bounced) {
        if (resH.velocity !== undefined) {
            particle.velocity.x = resH.velocity;
        }
        if (resH.position !== undefined) {
            particle.position.x = resH.position;
        }
    }
    const resV = rectSideBounce({
        pSide: {
            min: bounds.top,
            max: bounds.bottom,
        },
        pOtherSide: {
            min: bounds.left,
            max: bounds.right,
        },
        rectSide: {
            min: divBounds.top,
            max: divBounds.bottom,
        },
        rectOtherSide: {
            min: divBounds.left,
            max: divBounds.right,
        },
        velocity: particle.velocity.y,
        factor: getRangeValue(bounceOptions.vertical.value),
    });
    if (resV.bounced) {
        if (resV.velocity !== undefined) {
            particle.velocity.y = resV.velocity;
        }
        if (resV.position !== undefined) {
            particle.position.y = resV.position;
        }
    }
}
export function executeOnSingleOrMultiple(obj, callback) {
    const defaultIndex = 0;
    return isArray(obj) ? obj.map((item, index) => callback(item, index)) : callback(obj, defaultIndex);
}
export function itemFromSingleOrMultiple(obj, index, useIndex) {
    return isArray(obj) ? itemFromArray(obj, index, useIndex) : obj;
}
export function findItemFromSingleOrMultiple(obj, callback) {
    if (isArray(obj)) {
        return obj.find((t, index) => callback(t, index));
    }
    const defaultIndex = 0;
    return callback(obj, defaultIndex) ? obj : undefined;
}
export function initParticleNumericAnimationValue(options, pxRatio) {
    const valueRange = options.value, animationOptions = options.animation, res = {
        delayTime: getRangeValue(animationOptions.delay) * millisecondsToSeconds,
        enable: animationOptions.enable,
        value: getRangeValue(options.value) * pxRatio,
        max: getRangeMax(valueRange) * pxRatio,
        min: getRangeMin(valueRange) * pxRatio,
        loops: 0,
        maxLoops: getRangeValue(animationOptions.count),
        time: 0,
    }, decayOffset = 1;
    if (animationOptions.enable) {
        res.decay = decayOffset - getRangeValue(animationOptions.decay);
        switch (animationOptions.mode) {
            case AnimationMode.increase:
                res.status = AnimationStatus.increasing;
                break;
            case AnimationMode.decrease:
                res.status = AnimationStatus.decreasing;
                break;
            case AnimationMode.random:
                res.status = getRandom() >= halfRandom ? AnimationStatus.increasing : AnimationStatus.decreasing;
                break;
        }
        const autoStatus = animationOptions.mode === AnimationMode.auto;
        switch (animationOptions.startValue) {
            case StartValueType.min:
                res.value = res.min;
                if (autoStatus) {
                    res.status = AnimationStatus.increasing;
                }
                break;
            case StartValueType.max:
                res.value = res.max;
                if (autoStatus) {
                    res.status = AnimationStatus.decreasing;
                }
                break;
            case StartValueType.random:
            default:
                res.value = randomInRange(res);
                if (autoStatus) {
                    res.status = getRandom() >= halfRandom ? AnimationStatus.increasing : AnimationStatus.decreasing;
                }
                break;
        }
    }
    res.initialValue = res.value;
    return res;
}
function getPositionOrSize(positionOrSize, canvasSize) {
    const isPercent = positionOrSize.mode === PixelMode.percent;
    if (!isPercent) {
        const { mode: _, ...rest } = positionOrSize;
        return rest;
    }
    const isPosition = "x" in positionOrSize;
    if (isPosition) {
        return {
            x: (positionOrSize.x / percentDenominator) * canvasSize.width,
            y: (positionOrSize.y / percentDenominator) * canvasSize.height,
        };
    }
    else {
        return {
            width: (positionOrSize.width / percentDenominator) * canvasSize.width,
            height: (positionOrSize.height / percentDenominator) * canvasSize.height,
        };
    }
}
export function getPosition(position, canvasSize) {
    return getPositionOrSize(position, canvasSize);
}
export function getSize(size, canvasSize) {
    return getPositionOrSize(size, canvasSize);
}
function checkDestroy(particle, destroyType, value, minValue, maxValue) {
    switch (destroyType) {
        case DestroyType.max:
            if (value >= maxValue) {
                particle.destroy();
            }
            break;
        case DestroyType.min:
            if (value <= minValue) {
                particle.destroy();
            }
            break;
    }
}
export function updateAnimation(particle, data, changeDirection, destroyType, delta) {
    const minLoops = 0, minDelay = 0, identity = 1, minVelocity = 0, minDecay = 1;
    if (particle.destroyed ||
        !data ||
        !data.enable ||
        ((data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops))) {
        return;
    }
    const velocity = (data.velocity ?? minVelocity) * delta.factor, minValue = data.min, maxValue = data.max, decay = data.decay ?? minDecay;
    if (!data.time) {
        data.time = 0;
    }
    if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
        data.time += delta.value;
    }
    if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
        return;
    }
    switch (data.status) {
        case AnimationStatus.increasing:
            if (data.value >= maxValue) {
                if (changeDirection) {
                    data.status = AnimationStatus.decreasing;
                }
                else {
                    data.value -= maxValue;
                }
                if (!data.loops) {
                    data.loops = minLoops;
                }
                data.loops++;
            }
            else {
                data.value += velocity;
            }
            break;
        case AnimationStatus.decreasing:
            if (data.value <= minValue) {
                if (changeDirection) {
                    data.status = AnimationStatus.increasing;
                }
                else {
                    data.value += maxValue;
                }
                if (!data.loops) {
                    data.loops = minLoops;
                }
                data.loops++;
            }
            else {
                data.value -= velocity;
            }
    }
    if (data.velocity && decay !== identity) {
        data.velocity *= decay;
    }
    checkDestroy(particle, destroyType, data.value, minValue, maxValue);
    if (!particle.destroyed) {
        data.value = clamp(data.value, minValue, maxValue);
    }
}
export function assertValidVersion(engine, pluginVersion) {
    if (engine.version === pluginVersion) {
        return;
    }
    throw new Error(`The tsParticles version is different from the loaded plugins version. Engine version: ${engine.version}. Plugins version: ${pluginVersion}`);
}
