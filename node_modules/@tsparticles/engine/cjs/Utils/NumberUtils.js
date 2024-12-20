"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRandom = setRandom;
exports.getRandom = getRandom;
exports.setAnimationFunctions = setAnimationFunctions;
exports.animate = animate;
exports.cancelAnimation = cancelAnimation;
exports.clamp = clamp;
exports.mix = mix;
exports.randomInRange = randomInRange;
exports.getRangeValue = getRangeValue;
exports.getRangeMin = getRangeMin;
exports.getRangeMax = getRangeMax;
exports.setRangeValue = setRangeValue;
exports.getDistances = getDistances;
exports.getDistance = getDistance;
exports.degToRad = degToRad;
exports.getParticleDirectionAngle = getParticleDirectionAngle;
exports.getParticleBaseVelocity = getParticleBaseVelocity;
exports.collisionVelocity = collisionVelocity;
exports.calcPositionFromSize = calcPositionFromSize;
exports.calcPositionOrRandomFromSize = calcPositionOrRandomFromSize;
exports.calcPositionOrRandomFromSizeRanged = calcPositionOrRandomFromSizeRanged;
exports.calcExactPositionOrRandomFromSize = calcExactPositionOrRandomFromSize;
exports.calcExactPositionOrRandomFromSizeRanged = calcExactPositionOrRandomFromSizeRanged;
exports.parseAlpha = parseAlpha;
const MoveDirection_js_1 = require("../Enums/Directions/MoveDirection.js");
const Vectors_js_1 = require("../Core/Utils/Vectors.js");
const TypeUtils_js_1 = require("./TypeUtils.js");
const Constants_js_1 = require("../Core/Utils/Constants.js");
let _random = Math.random;
const _animationLoop = {
    nextFrame: (cb) => requestAnimationFrame(cb),
    cancel: (idx) => cancelAnimationFrame(idx),
}, double = 2, doublePI = Math.PI * double;
function setRandom(rnd = Math.random) {
    _random = rnd;
}
function getRandom() {
    const min = 0, max = 1;
    return clamp(_random(), min, max - Number.EPSILON);
}
function setAnimationFunctions(nextFrame, cancel) {
    _animationLoop.nextFrame = (callback) => nextFrame(callback);
    _animationLoop.cancel = (handle) => cancel(handle);
}
function animate(fn) {
    return _animationLoop.nextFrame(fn);
}
function cancelAnimation(handle) {
    _animationLoop.cancel(handle);
}
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
function mix(comp1, comp2, weight1, weight2) {
    return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRange(r) {
    const max = getRangeMax(r), minOffset = 0;
    let min = getRangeMin(r);
    if (max === min) {
        min = minOffset;
    }
    return getRandom() * (max - min) + min;
}
function getRangeValue(value) {
    return (0, TypeUtils_js_1.isNumber)(value) ? value : randomInRange(value);
}
function getRangeMin(value) {
    return (0, TypeUtils_js_1.isNumber)(value) ? value : value.min;
}
function getRangeMax(value) {
    return (0, TypeUtils_js_1.isNumber)(value) ? value : value.max;
}
function setRangeValue(source, value) {
    if (source === value || (value === undefined && (0, TypeUtils_js_1.isNumber)(source))) {
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
function getDistances(pointA, pointB) {
    const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y, squareExp = 2;
    return { dx: dx, dy: dy, distance: Math.sqrt(dx ** squareExp + dy ** squareExp) };
}
function getDistance(pointA, pointB) {
    return getDistances(pointA, pointB).distance;
}
function degToRad(degrees) {
    const PIDeg = 180;
    return (degrees * Math.PI) / PIDeg;
}
function getParticleDirectionAngle(direction, position, center) {
    if ((0, TypeUtils_js_1.isNumber)(direction)) {
        return degToRad(direction);
    }
    const empty = 0, half = 0.5, quarter = 0.25, threeQuarter = half + quarter;
    switch (direction) {
        case MoveDirection_js_1.MoveDirection.top:
            return -Math.PI * half;
        case MoveDirection_js_1.MoveDirection.topRight:
            return -Math.PI * quarter;
        case MoveDirection_js_1.MoveDirection.right:
            return empty;
        case MoveDirection_js_1.MoveDirection.bottomRight:
            return Math.PI * quarter;
        case MoveDirection_js_1.MoveDirection.bottom:
            return Math.PI * half;
        case MoveDirection_js_1.MoveDirection.bottomLeft:
            return Math.PI * threeQuarter;
        case MoveDirection_js_1.MoveDirection.left:
            return Math.PI;
        case MoveDirection_js_1.MoveDirection.topLeft:
            return -Math.PI * threeQuarter;
        case MoveDirection_js_1.MoveDirection.inside:
            return Math.atan2(center.y - position.y, center.x - position.x);
        case MoveDirection_js_1.MoveDirection.outside:
            return Math.atan2(position.y - center.y, position.x - center.x);
        default:
            return getRandom() * doublePI;
    }
}
function getParticleBaseVelocity(direction) {
    const baseVelocity = Vectors_js_1.Vector.origin;
    baseVelocity.length = 1;
    baseVelocity.angle = direction;
    return baseVelocity;
}
function collisionVelocity(v1, v2, m1, m2) {
    const double = 2;
    return Vectors_js_1.Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * double * m2) / (m1 + m2), v1.y);
}
function calcPositionFromSize(data) {
    return data.position?.x !== undefined && data.position.y !== undefined
        ? {
            x: (data.position.x * data.size.width) / Constants_js_1.percentDenominator,
            y: (data.position.y * data.size.height) / Constants_js_1.percentDenominator,
        }
        : undefined;
}
function calcPositionOrRandomFromSize(data) {
    return {
        x: ((data.position?.x ?? getRandom() * Constants_js_1.percentDenominator) * data.size.width) / Constants_js_1.percentDenominator,
        y: ((data.position?.y ?? getRandom() * Constants_js_1.percentDenominator) * data.size.height) / Constants_js_1.percentDenominator,
    };
}
function calcPositionOrRandomFromSizeRanged(data) {
    const position = {
        x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
        y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined,
    };
    return calcPositionOrRandomFromSize({ size: data.size, position });
}
function calcExactPositionOrRandomFromSize(data) {
    return {
        x: data.position?.x ?? getRandom() * data.size.width,
        y: data.position?.y ?? getRandom() * data.size.height,
    };
}
function calcExactPositionOrRandomFromSizeRanged(data) {
    const position = {
        x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
        y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined,
    };
    return calcExactPositionOrRandomFromSize({ size: data.size, position });
}
function parseAlpha(input) {
    const defaultAlpha = 1;
    if (!input) {
        return defaultAlpha;
    }
    return input.endsWith("%") ? parseFloat(input) / Constants_js_1.percentDenominator : parseFloat(input);
}
