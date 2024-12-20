(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./NumberUtils", "../Core/Utils/Vector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isArray = exports.isObject = exports.isFunction = exports.isNumber = exports.isString = exports.isBoolean = exports.getSize = exports.getPosition = exports.initParticleNumericAnimationValue = exports.findItemFromSingleOrMultiple = exports.itemFromSingleOrMultiple = exports.executeOnSingleOrMultiple = exports.rectBounce = exports.circleBounce = exports.circleBounceDataFromParticle = exports.divMode = exports.singleDivModeExecute = exports.divModeExecute = exports.isDivModeEnabled = exports.deepExtend = exports.calculateBounds = exports.areBoundsInside = exports.isPointInside = exports.itemFromArray = exports.arrayRandomIndex = exports.loadFont = exports.isInArray = exports.safeMutationObserver = exports.safeMatchMedia = exports.hasMatchMedia = exports.isSsr = exports.getLogger = exports.setLogger = void 0;
    const NumberUtils_1 = require("./NumberUtils");
    const Vector_1 = require("../Core/Utils/Vector");
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
    exports.setLogger = setLogger;
    function getLogger() {
        return _logger;
    }
    exports.getLogger = getLogger;
    function rectSideBounce(data) {
        const res = { bounced: false }, { pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor } = data;
        if (pOtherSide.min < rectOtherSide.min ||
            pOtherSide.min > rectOtherSide.max ||
            pOtherSide.max < rectOtherSide.min ||
            pOtherSide.max > rectOtherSide.max) {
            return res;
        }
        if ((pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0) ||
            (pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0)) {
            res.velocity = velocity * -factor;
            res.bounced = true;
        }
        return res;
    }
    function checkSelector(element, selectors) {
        const res = executeOnSingleOrMultiple(selectors, (selector) => {
            return element.matches(selector);
        });
        return isArray(res) ? res.some((t) => t) : res;
    }
    function isSsr() {
        return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
    }
    exports.isSsr = isSsr;
    function hasMatchMedia() {
        return !isSsr() && typeof matchMedia !== "undefined";
    }
    exports.hasMatchMedia = hasMatchMedia;
    function safeMatchMedia(query) {
        if (!hasMatchMedia()) {
            return;
        }
        return matchMedia(query);
    }
    exports.safeMatchMedia = safeMatchMedia;
    function safeMutationObserver(callback) {
        if (isSsr() || typeof MutationObserver === "undefined") {
            return;
        }
        return new MutationObserver(callback);
    }
    exports.safeMutationObserver = safeMutationObserver;
    function isInArray(value, array) {
        return value === array || (isArray(array) && array.indexOf(value) > -1);
    }
    exports.isInArray = isInArray;
    async function loadFont(font, weight) {
        try {
            await document.fonts.load(`${weight ?? "400"} 36px '${font ?? "Verdana"}'`);
        }
        catch {
        }
    }
    exports.loadFont = loadFont;
    function arrayRandomIndex(array) {
        return Math.floor((0, NumberUtils_1.getRandom)() * array.length);
    }
    exports.arrayRandomIndex = arrayRandomIndex;
    function itemFromArray(array, index, useIndex = true) {
        return array[index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array)];
    }
    exports.itemFromArray = itemFromArray;
    function isPointInside(point, size, offset, radius, direction) {
        return areBoundsInside(calculateBounds(point, radius ?? 0), size, offset, direction);
    }
    exports.isPointInside = isPointInside;
    function areBoundsInside(bounds, size, offset, direction) {
        let inside = true;
        if (!direction || direction === "bottom") {
            inside = bounds.top < size.height + offset.x;
        }
        if (inside && (!direction || direction === "left")) {
            inside = bounds.right > offset.x;
        }
        if (inside && (!direction || direction === "right")) {
            inside = bounds.left < size.width + offset.y;
        }
        if (inside && (!direction || direction === "top")) {
            inside = bounds.bottom > offset.y;
        }
        return inside;
    }
    exports.areBoundsInside = areBoundsInside;
    function calculateBounds(point, radius) {
        return {
            bottom: point.y + radius,
            left: point.x - radius,
            right: point.x + radius,
            top: point.y - radius,
        };
    }
    exports.calculateBounds = calculateBounds;
    function deepExtend(destination, ...sources) {
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
                        ? value.map((v) => deepExtend(destDict[key], v))
                        : deepExtend(destDict[key], value);
            }
        }
        return destination;
    }
    exports.deepExtend = deepExtend;
    function isDivModeEnabled(mode, divs) {
        return !!findItemFromSingleOrMultiple(divs, (t) => t.enable && isInArray(mode, t.mode));
    }
    exports.isDivModeEnabled = isDivModeEnabled;
    function divModeExecute(mode, divs, callback) {
        executeOnSingleOrMultiple(divs, (div) => {
            const divMode = div.mode, divEnabled = div.enable;
            if (divEnabled && isInArray(mode, divMode)) {
                singleDivModeExecute(div, callback);
            }
        });
    }
    exports.divModeExecute = divModeExecute;
    function singleDivModeExecute(div, callback) {
        const selectors = div.selectors;
        executeOnSingleOrMultiple(selectors, (selector) => {
            callback(selector, div);
        });
    }
    exports.singleDivModeExecute = singleDivModeExecute;
    function divMode(divs, element) {
        if (!element || !divs) {
            return;
        }
        return findItemFromSingleOrMultiple(divs, (div) => {
            return checkSelector(element, div.selectors);
        });
    }
    exports.divMode = divMode;
    function circleBounceDataFromParticle(p) {
        return {
            position: p.getPosition(),
            radius: p.getRadius(),
            mass: p.getMass(),
            velocity: p.velocity,
            factor: Vector_1.Vector.create((0, NumberUtils_1.getValue)(p.options.bounce.horizontal), (0, NumberUtils_1.getValue)(p.options.bounce.vertical)),
        };
    }
    exports.circleBounceDataFromParticle = circleBounceDataFromParticle;
    function circleBounce(p1, p2) {
        const { x: xVelocityDiff, y: yVelocityDiff } = p1.velocity.sub(p2.velocity), [pos1, pos2] = [p1.position, p2.position], { dx: xDist, dy: yDist } = (0, NumberUtils_1.getDistances)(pos2, pos1);
        if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) {
            return;
        }
        const angle = -Math.atan2(yDist, xDist), m1 = p1.mass, m2 = p2.mass, u1 = p1.velocity.rotate(angle), u2 = p2.velocity.rotate(angle), v1 = (0, NumberUtils_1.collisionVelocity)(u1, u2, m1, m2), v2 = (0, NumberUtils_1.collisionVelocity)(u2, u1, m1, m2), vFinal1 = v1.rotate(-angle), vFinal2 = v2.rotate(-angle);
        p1.velocity.x = vFinal1.x * p1.factor.x;
        p1.velocity.y = vFinal1.y * p1.factor.y;
        p2.velocity.x = vFinal2.x * p2.factor.x;
        p2.velocity.y = vFinal2.y * p2.factor.y;
    }
    exports.circleBounce = circleBounce;
    function rectBounce(particle, divBounds) {
        const pPos = particle.getPosition(), size = particle.getRadius(), bounds = calculateBounds(pPos, size), resH = rectSideBounce({
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
            factor: (0, NumberUtils_1.getValue)(particle.options.bounce.horizontal),
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
            factor: (0, NumberUtils_1.getValue)(particle.options.bounce.vertical),
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
    exports.rectBounce = rectBounce;
    function executeOnSingleOrMultiple(obj, callback) {
        return isArray(obj) ? obj.map((item, index) => callback(item, index)) : callback(obj, 0);
    }
    exports.executeOnSingleOrMultiple = executeOnSingleOrMultiple;
    function itemFromSingleOrMultiple(obj, index, useIndex) {
        return isArray(obj) ? itemFromArray(obj, index, useIndex) : obj;
    }
    exports.itemFromSingleOrMultiple = itemFromSingleOrMultiple;
    function findItemFromSingleOrMultiple(obj, callback) {
        return isArray(obj) ? obj.find((t, index) => callback(t, index)) : callback(obj, 0) ? obj : undefined;
    }
    exports.findItemFromSingleOrMultiple = findItemFromSingleOrMultiple;
    function initParticleNumericAnimationValue(options, pxRatio) {
        const valueRange = options.value, animationOptions = options.animation, res = {
            delayTime: (0, NumberUtils_1.getRangeValue)(animationOptions.delay) * 1000,
            enable: animationOptions.enable,
            value: (0, NumberUtils_1.getRangeValue)(options.value) * pxRatio,
            max: (0, NumberUtils_1.getRangeMax)(valueRange) * pxRatio,
            min: (0, NumberUtils_1.getRangeMin)(valueRange) * pxRatio,
            loops: 0,
            maxLoops: (0, NumberUtils_1.getRangeValue)(animationOptions.count),
            time: 0,
        };
        if (animationOptions.enable) {
            res.decay = 1 - (0, NumberUtils_1.getRangeValue)(animationOptions.decay);
            switch (animationOptions.mode) {
                case "increase":
                    res.status = "increasing";
                    break;
                case "decrease":
                    res.status = "decreasing";
                    break;
                case "random":
                    res.status = (0, NumberUtils_1.getRandom)() >= 0.5 ? "increasing" : "decreasing";
                    break;
            }
            const autoStatus = animationOptions.mode === "auto";
            switch (animationOptions.startValue) {
                case "min":
                    res.value = res.min;
                    if (autoStatus) {
                        res.status = "increasing";
                    }
                    break;
                case "max":
                    res.value = res.max;
                    if (autoStatus) {
                        res.status = "decreasing";
                    }
                    break;
                case "random":
                default:
                    res.value = (0, NumberUtils_1.randomInRange)(res);
                    if (autoStatus) {
                        res.status = (0, NumberUtils_1.getRandom)() >= 0.5 ? "increasing" : "decreasing";
                    }
                    break;
            }
        }
        res.initialValue = res.value;
        return res;
    }
    exports.initParticleNumericAnimationValue = initParticleNumericAnimationValue;
    function getPositionOrSize(positionOrSize, canvasSize) {
        const isPercent = positionOrSize.mode === "percent";
        if (!isPercent) {
            const { mode: _, ...rest } = positionOrSize;
            return rest;
        }
        const isPosition = "x" in positionOrSize;
        if (isPosition) {
            return {
                x: (positionOrSize.x / 100) * canvasSize.width,
                y: (positionOrSize.y / 100) * canvasSize.height,
            };
        }
        else {
            return {
                width: (positionOrSize.width / 100) * canvasSize.width,
                height: (positionOrSize.height / 100) * canvasSize.height,
            };
        }
    }
    function getPosition(position, canvasSize) {
        return getPositionOrSize(position, canvasSize);
    }
    exports.getPosition = getPosition;
    function getSize(size, canvasSize) {
        return getPositionOrSize(size, canvasSize);
    }
    exports.getSize = getSize;
    function isBoolean(arg) {
        return typeof arg === "boolean";
    }
    exports.isBoolean = isBoolean;
    function isString(arg) {
        return typeof arg === "string";
    }
    exports.isString = isString;
    function isNumber(arg) {
        return typeof arg === "number";
    }
    exports.isNumber = isNumber;
    function isFunction(arg) {
        return typeof arg === "function";
    }
    exports.isFunction = isFunction;
    function isObject(arg) {
        return typeof arg === "object" && arg !== null;
    }
    exports.isObject = isObject;
    function isArray(arg) {
        return Array.isArray(arg);
    }
    exports.isArray = isArray;
});
