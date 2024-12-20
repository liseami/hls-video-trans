(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Utils", "../Core/Utils/Vector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseAlpha = exports.calcExactPositionOrRandomFromSizeRanged = exports.calcExactPositionOrRandomFromSize = exports.calcPositionOrRandomFromSizeRanged = exports.calcPositionOrRandomFromSize = exports.calcPositionFromSize = exports.collisionVelocity = exports.getParticleBaseVelocity = exports.getParticleDirectionAngle = exports.getDistance = exports.getDistances = exports.getValue = exports.setRangeValue = exports.getRangeMax = exports.getRangeMin = exports.getRangeValue = exports.randomInRange = exports.mix = exports.clamp = exports.getRandom = exports.setRandom = exports.getEasing = exports.addEasing = void 0;
    const Utils_1 = require("./Utils");
    const Vector_1 = require("../Core/Utils/Vector");
    let _random = Math.random;
    const easings = new Map();
    function addEasing(name, easing) {
        if (easings.get(name)) {
            return;
        }
        easings.set(name, easing);
    }
    exports.addEasing = addEasing;
    function getEasing(name) {
        return easings.get(name) || ((value) => value);
    }
    exports.getEasing = getEasing;
    function setRandom(rnd = Math.random) {
        _random = rnd;
    }
    exports.setRandom = setRandom;
    function getRandom() {
        return clamp(_random(), 0, 1 - 1e-16);
    }
    exports.getRandom = getRandom;
    function clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
    exports.clamp = clamp;
    function mix(comp1, comp2, weight1, weight2) {
        return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
    }
    exports.mix = mix;
    function randomInRange(r) {
        const max = getRangeMax(r);
        let min = getRangeMin(r);
        if (max === min) {
            min = 0;
        }
        return getRandom() * (max - min) + min;
    }
    exports.randomInRange = randomInRange;
    function getRangeValue(value) {
        return (0, Utils_1.isNumber)(value) ? value : randomInRange(value);
    }
    exports.getRangeValue = getRangeValue;
    function getRangeMin(value) {
        return (0, Utils_1.isNumber)(value) ? value : value.min;
    }
    exports.getRangeMin = getRangeMin;
    function getRangeMax(value) {
        return (0, Utils_1.isNumber)(value) ? value : value.max;
    }
    exports.getRangeMax = getRangeMax;
    function setRangeValue(source, value) {
        if (source === value || (value === undefined && (0, Utils_1.isNumber)(source))) {
            return source;
        }
        const min = getRangeMin(source), max = getRangeMax(source);
        return value !== undefined
            ? {
                min: Math.min(min, value),
                max: Math.max(max, value),
            }
            : setRangeValue(min, max);
    }
    exports.setRangeValue = setRangeValue;
    function getValue(options) {
        const random = options.random, { enable, minimumValue } = (0, Utils_1.isBoolean)(random)
            ? {
                enable: random,
                minimumValue: 0,
            }
            : random;
        return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
    }
    exports.getValue = getValue;
    function getDistances(pointA, pointB) {
        const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
        return { dx: dx, dy: dy, distance: Math.sqrt(dx ** 2 + dy ** 2) };
    }
    exports.getDistances = getDistances;
    function getDistance(pointA, pointB) {
        return getDistances(pointA, pointB).distance;
    }
    exports.getDistance = getDistance;
    function getParticleDirectionAngle(direction, position, center) {
        if ((0, Utils_1.isNumber)(direction)) {
            return (direction * Math.PI) / 180;
        }
        switch (direction) {
            case "top":
                return -Math.PI / 2;
            case "top-right":
                return -Math.PI / 4;
            case "right":
                return 0;
            case "bottom-right":
                return Math.PI / 4;
            case "bottom":
                return Math.PI / 2;
            case "bottom-left":
                return (3 * Math.PI) / 4;
            case "left":
                return Math.PI;
            case "top-left":
                return (-3 * Math.PI) / 4;
            case "inside":
                return Math.atan2(center.y - position.y, center.x - position.x);
            case "outside":
                return Math.atan2(position.y - center.y, position.x - center.x);
            default:
                return getRandom() * Math.PI * 2;
        }
    }
    exports.getParticleDirectionAngle = getParticleDirectionAngle;
    function getParticleBaseVelocity(direction) {
        const baseVelocity = Vector_1.Vector.origin;
        baseVelocity.length = 1;
        baseVelocity.angle = direction;
        return baseVelocity;
    }
    exports.getParticleBaseVelocity = getParticleBaseVelocity;
    function collisionVelocity(v1, v2, m1, m2) {
        return Vector_1.Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2), v1.y);
    }
    exports.collisionVelocity = collisionVelocity;
    function calcPositionFromSize(data) {
        return data.position && data.position.x !== undefined && data.position.y !== undefined
            ? {
                x: (data.position.x * data.size.width) / 100,
                y: (data.position.y * data.size.height) / 100,
            }
            : undefined;
    }
    exports.calcPositionFromSize = calcPositionFromSize;
    function calcPositionOrRandomFromSize(data) {
        return {
            x: ((data.position?.x ?? getRandom() * 100) * data.size.width) / 100,
            y: ((data.position?.y ?? getRandom() * 100) * data.size.height) / 100,
        };
    }
    exports.calcPositionOrRandomFromSize = calcPositionOrRandomFromSize;
    function calcPositionOrRandomFromSizeRanged(data) {
        const position = {
            x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
            y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined,
        };
        return calcPositionOrRandomFromSize({ size: data.size, position });
    }
    exports.calcPositionOrRandomFromSizeRanged = calcPositionOrRandomFromSizeRanged;
    function calcExactPositionOrRandomFromSize(data) {
        return {
            x: data.position?.x ?? getRandom() * data.size.width,
            y: data.position?.y ?? getRandom() * data.size.height,
        };
    }
    exports.calcExactPositionOrRandomFromSize = calcExactPositionOrRandomFromSize;
    function calcExactPositionOrRandomFromSizeRanged(data) {
        const position = {
            x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
            y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined,
        };
        return calcExactPositionOrRandomFromSize({ size: data.size, position });
    }
    exports.calcExactPositionOrRandomFromSizeRanged = calcExactPositionOrRandomFromSizeRanged;
    function parseAlpha(input) {
        return input ? (input.endsWith("%") ? parseFloat(input) / 100 : parseFloat(input)) : 1;
    }
    exports.parseAlpha = parseAlpha;
});
