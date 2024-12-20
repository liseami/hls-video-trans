import { MoveDirection } from "../Enums/Directions/MoveDirection.js";
import { Vector } from "../Core/Utils/Vectors.js";
import { isNumber } from "./TypeUtils.js";
import { percentDenominator } from "../Core/Utils/Constants.js";
let _random = Math.random;
const _animationLoop = {
    nextFrame: (cb) => requestAnimationFrame(cb),
    cancel: (idx) => cancelAnimationFrame(idx),
}, double = 2, doublePI = Math.PI * double;
export function setRandom(rnd = Math.random) {
    _random = rnd;
}
export function getRandom() {
    const min = 0, max = 1;
    return clamp(_random(), min, max - Number.EPSILON);
}
export function setAnimationFunctions(nextFrame, cancel) {
    _animationLoop.nextFrame = (callback) => nextFrame(callback);
    _animationLoop.cancel = (handle) => cancel(handle);
}
export function animate(fn) {
    return _animationLoop.nextFrame(fn);
}
export function cancelAnimation(handle) {
    _animationLoop.cancel(handle);
}
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
export function mix(comp1, comp2, weight1, weight2) {
    return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
export function randomInRange(r) {
    const max = getRangeMax(r), minOffset = 0;
    let min = getRangeMin(r);
    if (max === min) {
        min = minOffset;
    }
    return getRandom() * (max - min) + min;
}
export function getRangeValue(value) {
    return isNumber(value) ? value : randomInRange(value);
}
export function getRangeMin(value) {
    return isNumber(value) ? value : value.min;
}
export function getRangeMax(value) {
    return isNumber(value) ? value : value.max;
}
export function setRangeValue(source, value) {
    if (source === value || (value === undefined && isNumber(source))) {
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
export function getDistances(pointA, pointB) {
    const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y, squareExp = 2;
    return { dx: dx, dy: dy, distance: Math.sqrt(dx ** squareExp + dy ** squareExp) };
}
export function getDistance(pointA, pointB) {
    return getDistances(pointA, pointB).distance;
}
export function degToRad(degrees) {
    const PIDeg = 180;
    return (degrees * Math.PI) / PIDeg;
}
export function getParticleDirectionAngle(direction, position, center) {
    if (isNumber(direction)) {
        return degToRad(direction);
    }
    const empty = 0, half = 0.5, quarter = 0.25, threeQuarter = half + quarter;
    switch (direction) {
        case MoveDirection.top:
            return -Math.PI * half;
        case MoveDirection.topRight:
            return -Math.PI * quarter;
        case MoveDirection.right:
            return empty;
        case MoveDirection.bottomRight:
            return Math.PI * quarter;
        case MoveDirection.bottom:
            return Math.PI * half;
        case MoveDirection.bottomLeft:
            return Math.PI * threeQuarter;
        case MoveDirection.left:
            return Math.PI;
        case MoveDirection.topLeft:
            return -Math.PI * threeQuarter;
        case MoveDirection.inside:
            return Math.atan2(center.y - position.y, center.x - position.x);
        case MoveDirection.outside:
            return Math.atan2(position.y - center.y, position.x - center.x);
        default:
            return getRandom() * doublePI;
    }
}
export function getParticleBaseVelocity(direction) {
    const baseVelocity = Vector.origin;
    baseVelocity.length = 1;
    baseVelocity.angle = direction;
    return baseVelocity;
}
export function collisionVelocity(v1, v2, m1, m2) {
    const double = 2;
    return Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * double * m2) / (m1 + m2), v1.y);
}
export function calcPositionFromSize(data) {
    return data.position?.x !== undefined && data.position.y !== undefined
        ? {
            x: (data.position.x * data.size.width) / percentDenominator,
            y: (data.position.y * data.size.height) / percentDenominator,
        }
        : undefined;
}
export function calcPositionOrRandomFromSize(data) {
    return {
        x: ((data.position?.x ?? getRandom() * percentDenominator) * data.size.width) / percentDenominator,
        y: ((data.position?.y ?? getRandom() * percentDenominator) * data.size.height) / percentDenominator,
    };
}
export function calcPositionOrRandomFromSizeRanged(data) {
    const position = {
        x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
        y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined,
    };
    return calcPositionOrRandomFromSize({ size: data.size, position });
}
export function calcExactPositionOrRandomFromSize(data) {
    return {
        x: data.position?.x ?? getRandom() * data.size.width,
        y: data.position?.y ?? getRandom() * data.size.height,
    };
}
export function calcExactPositionOrRandomFromSizeRanged(data) {
    const position = {
        x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
        y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined,
    };
    return calcExactPositionOrRandomFromSize({ size: data.size, position });
}
export function parseAlpha(input) {
    const defaultAlpha = 1;
    if (!input) {
        return defaultAlpha;
    }
    return input.endsWith("%") ? parseFloat(input) / percentDenominator : parseFloat(input);
}
