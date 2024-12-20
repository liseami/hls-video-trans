import { isBoolean, isNumber } from "./Utils";
import { Vector } from "../Core/Utils/Vector";
let _random = Math.random;
const easings = new Map();
export function addEasing(name, easing) {
    if (easings.get(name)) {
        return;
    }
    easings.set(name, easing);
}
export function getEasing(name) {
    return easings.get(name) || ((value) => value);
}
export function setRandom(rnd = Math.random) {
    _random = rnd;
}
export function getRandom() {
    return clamp(_random(), 0, 1 - 1e-16);
}
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
export function mix(comp1, comp2, weight1, weight2) {
    return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
export function randomInRange(r) {
    const max = getRangeMax(r);
    let min = getRangeMin(r);
    if (max === min) {
        min = 0;
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
export function getValue(options) {
    const random = options.random, { enable, minimumValue } = isBoolean(random)
        ? {
            enable: random,
            minimumValue: 0,
        }
        : random;
    return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
}
export function getDistances(pointA, pointB) {
    const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
    return { dx: dx, dy: dy, distance: Math.sqrt(dx ** 2 + dy ** 2) };
}
export function getDistance(pointA, pointB) {
    return getDistances(pointA, pointB).distance;
}
export function getParticleDirectionAngle(direction, position, center) {
    if (isNumber(direction)) {
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
export function getParticleBaseVelocity(direction) {
    const baseVelocity = Vector.origin;
    baseVelocity.length = 1;
    baseVelocity.angle = direction;
    return baseVelocity;
}
export function collisionVelocity(v1, v2, m1, m2) {
    return Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2), v1.y);
}
export function calcPositionFromSize(data) {
    return data.position && data.position.x !== undefined && data.position.y !== undefined
        ? {
            x: (data.position.x * data.size.width) / 100,
            y: (data.position.y * data.size.height) / 100,
        }
        : undefined;
}
export function calcPositionOrRandomFromSize(data) {
    return {
        x: ((data.position?.x ?? getRandom() * 100) * data.size.width) / 100,
        y: ((data.position?.y ?? getRandom() * 100) * data.size.height) / 100,
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
    return input ? (input.endsWith("%") ? parseFloat(input) / 100 : parseFloat(input)) : 1;
}
