(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./NumberUtils.js", "../Core/Utils/Constants.js", "./TypeUtils.js", "../Enums/Modes/AnimationMode.js", "../Enums/AnimationStatus.js", "../Enums/Types/DestroyType.js", "../Enums/Directions/OutModeDirection.js", "../Enums/Modes/PixelMode.js", "../Enums/Types/StartValueType.js", "../Core/Utils/Vectors.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setLogger = setLogger;
    exports.getLogger = getLogger;
    exports.isSsr = isSsr;
    exports.hasMatchMedia = hasMatchMedia;
    exports.safeMatchMedia = safeMatchMedia;
    exports.safeIntersectionObserver = safeIntersectionObserver;
    exports.safeMutationObserver = safeMutationObserver;
    exports.isInArray = isInArray;
    exports.loadFont = loadFont;
    exports.arrayRandomIndex = arrayRandomIndex;
    exports.itemFromArray = itemFromArray;
    exports.isPointInside = isPointInside;
    exports.areBoundsInside = areBoundsInside;
    exports.calculateBounds = calculateBounds;
    exports.deepExtend = deepExtend;
    exports.isDivModeEnabled = isDivModeEnabled;
    exports.divModeExecute = divModeExecute;
    exports.singleDivModeExecute = singleDivModeExecute;
    exports.divMode = divMode;
    exports.circleBounceDataFromParticle = circleBounceDataFromParticle;
    exports.circleBounce = circleBounce;
    exports.rectBounce = rectBounce;
    exports.executeOnSingleOrMultiple = executeOnSingleOrMultiple;
    exports.itemFromSingleOrMultiple = itemFromSingleOrMultiple;
    exports.findItemFromSingleOrMultiple = findItemFromSingleOrMultiple;
    exports.initParticleNumericAnimationValue = initParticleNumericAnimationValue;
    exports.getPosition = getPosition;
    exports.getSize = getSize;
    exports.updateAnimation = updateAnimation;
    exports.assertValidVersion = assertValidVersion;
    const NumberUtils_js_1 = require("./NumberUtils.js");
    const Constants_js_1 = require("../Core/Utils/Constants.js");
    const TypeUtils_js_1 = require("./TypeUtils.js");
    const AnimationMode_js_1 = require("../Enums/Modes/AnimationMode.js");
    const AnimationStatus_js_1 = require("../Enums/AnimationStatus.js");
    const DestroyType_js_1 = require("../Enums/Types/DestroyType.js");
    const OutModeDirection_js_1 = require("../Enums/Directions/OutModeDirection.js");
    const PixelMode_js_1 = require("../Enums/Modes/PixelMode.js");
    const StartValueType_js_1 = require("../Enums/Types/StartValueType.js");
    const Vectors_js_1 = require("../Core/Utils/Vectors.js");
    const _logger = {
        debug: console.debug,
        error: console.error,
        info: console.info,
        log: console.log,
        verbose: console.log,
        warning: console.warn,
    };
    function setLogger(logger) {
        _logger.debug = logger.debug || _logger.debug;
        _logger.error = logger.error || _logger.error;
        _logger.info = logger.info || _logger.info;
        _logger.log = logger.log || _logger.log;
        _logger.verbose = logger.verbose || _logger.verbose;
        _logger.warning = logger.warning || _logger.warning;
    }
    function getLogger() {
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
        return (0, TypeUtils_js_1.isArray)(res) ? res.some(t => t) : res;
    }
    function isSsr() {
        return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
    }
    function hasMatchMedia() {
        return !isSsr() && typeof matchMedia !== "undefined";
    }
    function safeMatchMedia(query) {
        if (!hasMatchMedia()) {
            return;
        }
        return matchMedia(query);
    }
    function safeIntersectionObserver(callback) {
        if (isSsr() || typeof IntersectionObserver === "undefined") {
            return;
        }
        return new IntersectionObserver(callback);
    }
    function safeMutationObserver(callback) {
        if (isSsr() || typeof MutationObserver === "undefined") {
            return;
        }
        return new MutationObserver(callback);
    }
    function isInArray(value, array) {
        const invalidIndex = -1;
        return value === array || ((0, TypeUtils_js_1.isArray)(array) && array.indexOf(value) > invalidIndex);
    }
    async function loadFont(font, weight) {
        try {
            await document.fonts.load(`${weight ?? "400"} 36px '${font ?? "Verdana"}'`);
        }
        catch {
        }
    }
    function arrayRandomIndex(array) {
        return Math.floor((0, NumberUtils_js_1.getRandom)() * array.length);
    }
    function itemFromArray(array, index, useIndex = true) {
        return array[index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array)];
    }
    function isPointInside(point, size, offset, radius, direction) {
        const minRadius = 0;
        return areBoundsInside(calculateBounds(point, radius ?? minRadius), size, offset, direction);
    }
    function areBoundsInside(bounds, size, offset, direction) {
        let inside = true;
        if (!direction || direction === OutModeDirection_js_1.OutModeDirection.bottom) {
            inside = bounds.top < size.height + offset.x;
        }
        if (inside && (!direction || direction === OutModeDirection_js_1.OutModeDirection.left)) {
            inside = bounds.right > offset.x;
        }
        if (inside && (!direction || direction === OutModeDirection_js_1.OutModeDirection.right)) {
            inside = bounds.left < size.width + offset.y;
        }
        if (inside && (!direction || direction === OutModeDirection_js_1.OutModeDirection.top)) {
            inside = bounds.bottom > offset.y;
        }
        return inside;
    }
    function calculateBounds(point, radius) {
        return {
            bottom: point.y + radius,
            left: point.x - radius,
            right: point.x + radius,
            top: point.y - radius,
        };
    }
    function deepExtend(destination, ...sources) {
        for (const source of sources) {
            if (source === undefined || source === null) {
                continue;
            }
            if (!(0, TypeUtils_js_1.isObject)(source)) {
                destination = source;
                continue;
            }
            const sourceIsArray = Array.isArray(source);
            if (sourceIsArray && ((0, TypeUtils_js_1.isObject)(destination) || !destination || !Array.isArray(destination))) {
                destination = [];
            }
            else if (!sourceIsArray && ((0, TypeUtils_js_1.isObject)(destination) || !destination || Array.isArray(destination))) {
                destination = {};
            }
            for (const key in source) {
                if (key === "__proto__") {
                    continue;
                }
                const sourceDict = source, value = sourceDict[key], destDict = destination;
                destDict[key] =
                    (0, TypeUtils_js_1.isObject)(value) && Array.isArray(value)
                        ? value.map(v => deepExtend(destDict[key], v))
                        : deepExtend(destDict[key], value);
            }
        }
        return destination;
    }
    function isDivModeEnabled(mode, divs) {
        return !!findItemFromSingleOrMultiple(divs, t => t.enable && isInArray(mode, t.mode));
    }
    function divModeExecute(mode, divs, callback) {
        executeOnSingleOrMultiple(divs, div => {
            const divMode = div.mode, divEnabled = div.enable;
            if (divEnabled && isInArray(mode, divMode)) {
                singleDivModeExecute(div, callback);
            }
        });
    }
    function singleDivModeExecute(div, callback) {
        const selectors = div.selectors;
        executeOnSingleOrMultiple(selectors, selector => {
            callback(selector, div);
        });
    }
    function divMode(divs, element) {
        if (!element || !divs) {
            return;
        }
        return findItemFromSingleOrMultiple(divs, div => {
            return checkSelector(element, div.selectors);
        });
    }
    function circleBounceDataFromParticle(p) {
        return {
            position: p.getPosition(),
            radius: p.getRadius(),
            mass: p.getMass(),
            velocity: p.velocity,
            factor: Vectors_js_1.Vector.create((0, NumberUtils_js_1.getRangeValue)(p.options.bounce.horizontal.value), (0, NumberUtils_js_1.getRangeValue)(p.options.bounce.vertical.value)),
        };
    }
    function circleBounce(p1, p2) {
        const { x: xVelocityDiff, y: yVelocityDiff } = p1.velocity.sub(p2.velocity), [pos1, pos2] = [p1.position, p2.position], { dx: xDist, dy: yDist } = (0, NumberUtils_js_1.getDistances)(pos2, pos1), minimumDistance = 0;
        if (xVelocityDiff * xDist + yVelocityDiff * yDist < minimumDistance) {
            return;
        }
        const angle = -Math.atan2(yDist, xDist), m1 = p1.mass, m2 = p2.mass, u1 = p1.velocity.rotate(angle), u2 = p2.velocity.rotate(angle), v1 = (0, NumberUtils_js_1.collisionVelocity)(u1, u2, m1, m2), v2 = (0, NumberUtils_js_1.collisionVelocity)(u2, u1, m1, m2), vFinal1 = v1.rotate(-angle), vFinal2 = v2.rotate(-angle);
        p1.velocity.x = vFinal1.x * p1.factor.x;
        p1.velocity.y = vFinal1.y * p1.factor.y;
        p2.velocity.x = vFinal2.x * p2.factor.x;
        p2.velocity.y = vFinal2.y * p2.factor.y;
    }
    function rectBounce(particle, divBounds) {
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
            factor: (0, NumberUtils_js_1.getRangeValue)(bounceOptions.horizontal.value),
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
            factor: (0, NumberUtils_js_1.getRangeValue)(bounceOptions.vertical.value),
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
    function executeOnSingleOrMultiple(obj, callback) {
        const defaultIndex = 0;
        return (0, TypeUtils_js_1.isArray)(obj) ? obj.map((item, index) => callback(item, index)) : callback(obj, defaultIndex);
    }
    function itemFromSingleOrMultiple(obj, index, useIndex) {
        return (0, TypeUtils_js_1.isArray)(obj) ? itemFromArray(obj, index, useIndex) : obj;
    }
    function findItemFromSingleOrMultiple(obj, callback) {
        if ((0, TypeUtils_js_1.isArray)(obj)) {
            return obj.find((t, index) => callback(t, index));
        }
        const defaultIndex = 0;
        return callback(obj, defaultIndex) ? obj : undefined;
    }
    function initParticleNumericAnimationValue(options, pxRatio) {
        const valueRange = options.value, animationOptions = options.animation, res = {
            delayTime: (0, NumberUtils_js_1.getRangeValue)(animationOptions.delay) * Constants_js_1.millisecondsToSeconds,
            enable: animationOptions.enable,
            value: (0, NumberUtils_js_1.getRangeValue)(options.value) * pxRatio,
            max: (0, NumberUtils_js_1.getRangeMax)(valueRange) * pxRatio,
            min: (0, NumberUtils_js_1.getRangeMin)(valueRange) * pxRatio,
            loops: 0,
            maxLoops: (0, NumberUtils_js_1.getRangeValue)(animationOptions.count),
            time: 0,
        }, decayOffset = 1;
        if (animationOptions.enable) {
            res.decay = decayOffset - (0, NumberUtils_js_1.getRangeValue)(animationOptions.decay);
            switch (animationOptions.mode) {
                case AnimationMode_js_1.AnimationMode.increase:
                    res.status = AnimationStatus_js_1.AnimationStatus.increasing;
                    break;
                case AnimationMode_js_1.AnimationMode.decrease:
                    res.status = AnimationStatus_js_1.AnimationStatus.decreasing;
                    break;
                case AnimationMode_js_1.AnimationMode.random:
                    res.status = (0, NumberUtils_js_1.getRandom)() >= Constants_js_1.halfRandom ? AnimationStatus_js_1.AnimationStatus.increasing : AnimationStatus_js_1.AnimationStatus.decreasing;
                    break;
            }
            const autoStatus = animationOptions.mode === AnimationMode_js_1.AnimationMode.auto;
            switch (animationOptions.startValue) {
                case StartValueType_js_1.StartValueType.min:
                    res.value = res.min;
                    if (autoStatus) {
                        res.status = AnimationStatus_js_1.AnimationStatus.increasing;
                    }
                    break;
                case StartValueType_js_1.StartValueType.max:
                    res.value = res.max;
                    if (autoStatus) {
                        res.status = AnimationStatus_js_1.AnimationStatus.decreasing;
                    }
                    break;
                case StartValueType_js_1.StartValueType.random:
                default:
                    res.value = (0, NumberUtils_js_1.randomInRange)(res);
                    if (autoStatus) {
                        res.status = (0, NumberUtils_js_1.getRandom)() >= Constants_js_1.halfRandom ? AnimationStatus_js_1.AnimationStatus.increasing : AnimationStatus_js_1.AnimationStatus.decreasing;
                    }
                    break;
            }
        }
        res.initialValue = res.value;
        return res;
    }
    function getPositionOrSize(positionOrSize, canvasSize) {
        const isPercent = positionOrSize.mode === PixelMode_js_1.PixelMode.percent;
        if (!isPercent) {
            const { mode: _, ...rest } = positionOrSize;
            return rest;
        }
        const isPosition = "x" in positionOrSize;
        if (isPosition) {
            return {
                x: (positionOrSize.x / Constants_js_1.percentDenominator) * canvasSize.width,
                y: (positionOrSize.y / Constants_js_1.percentDenominator) * canvasSize.height,
            };
        }
        else {
            return {
                width: (positionOrSize.width / Constants_js_1.percentDenominator) * canvasSize.width,
                height: (positionOrSize.height / Constants_js_1.percentDenominator) * canvasSize.height,
            };
        }
    }
    function getPosition(position, canvasSize) {
        return getPositionOrSize(position, canvasSize);
    }
    function getSize(size, canvasSize) {
        return getPositionOrSize(size, canvasSize);
    }
    function checkDestroy(particle, destroyType, value, minValue, maxValue) {
        switch (destroyType) {
            case DestroyType_js_1.DestroyType.max:
                if (value >= maxValue) {
                    particle.destroy();
                }
                break;
            case DestroyType_js_1.DestroyType.min:
                if (value <= minValue) {
                    particle.destroy();
                }
                break;
        }
    }
    function updateAnimation(particle, data, changeDirection, destroyType, delta) {
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
            case AnimationStatus_js_1.AnimationStatus.increasing:
                if (data.value >= maxValue) {
                    if (changeDirection) {
                        data.status = AnimationStatus_js_1.AnimationStatus.decreasing;
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
            case AnimationStatus_js_1.AnimationStatus.decreasing:
                if (data.value <= minValue) {
                    if (changeDirection) {
                        data.status = AnimationStatus_js_1.AnimationStatus.increasing;
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
            data.value = (0, NumberUtils_js_1.clamp)(data.value, minValue, maxValue);
        }
    }
    function assertValidVersion(engine, pluginVersion) {
        if (engine.version === pluginVersion) {
            return;
        }
        throw new Error(`The tsParticles version is different from the loaded plugins version. Engine version: ${engine.version}. Plugins version: ${pluginVersion}`);
    }
});
