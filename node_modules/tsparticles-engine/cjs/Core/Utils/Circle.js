"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const Range_1 = require("./Range");
const Rectangle_1 = require("./Rectangle");
const NumberUtils_1 = require("../../Utils/NumberUtils");
class Circle extends Range_1.Range {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
    contains(point) {
        return (0, NumberUtils_1.getDistance)(point, this.position) <= this.radius;
    }
    intersects(range) {
        const pos1 = this.position, pos2 = range.position, distPos = { x: Math.abs(pos2.x - pos1.x), y: Math.abs(pos2.y - pos1.y) }, r = this.radius;
        if (range instanceof Circle) {
            const rSum = r + range.radius, dist = Math.sqrt(distPos.x ** 2 + distPos.y ** 2);
            return rSum > dist;
        }
        else if (range instanceof Rectangle_1.Rectangle) {
            const { width, height } = range.size, edges = Math.pow(distPos.x - width, 2) + Math.pow(distPos.y - height, 2);
            return (edges <= r ** 2 ||
                (distPos.x <= r + width && distPos.y <= r + height) ||
                distPos.x <= width ||
                distPos.y <= height);
        }
        return false;
    }
}
exports.Circle = Circle;
