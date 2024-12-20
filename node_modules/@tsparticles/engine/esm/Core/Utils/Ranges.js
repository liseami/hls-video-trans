import { RangeType } from "../../Types/RangeType.js";
import { getDistance } from "../../Utils/NumberUtils.js";
const squareExp = 2;
export class BaseRange {
    constructor(x, y, type) {
        this.position = {
            x: x,
            y: y,
        };
        this.type = type;
    }
}
export class Circle extends BaseRange {
    constructor(x, y, radius) {
        super(x, y, RangeType.circle);
        this.radius = radius;
    }
    contains(point) {
        return getDistance(point, this.position) <= this.radius;
    }
    intersects(range) {
        const pos1 = this.position, pos2 = range.position, distPos = { x: Math.abs(pos2.x - pos1.x), y: Math.abs(pos2.y - pos1.y) }, r = this.radius;
        if (range instanceof Circle || range.type === RangeType.circle) {
            const circleRange = range, rSum = r + circleRange.radius, dist = Math.sqrt(distPos.x ** squareExp + distPos.y ** squareExp);
            return rSum > dist;
        }
        else if (range instanceof Rectangle || range.type === RangeType.rectangle) {
            const rectRange = range, { width, height } = rectRange.size, edges = Math.pow(distPos.x - width, squareExp) + Math.pow(distPos.y - height, squareExp);
            return (edges <= r ** squareExp ||
                (distPos.x <= r + width && distPos.y <= r + height) ||
                distPos.x <= width ||
                distPos.y <= height);
        }
        return false;
    }
}
export class Rectangle extends BaseRange {
    constructor(x, y, width, height) {
        super(x, y, RangeType.rectangle);
        this.size = {
            height: height,
            width: width,
        };
    }
    contains(point) {
        const w = this.size.width, h = this.size.height, pos = this.position;
        return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
    }
    intersects(range) {
        if (range instanceof Circle) {
            return range.intersects(this);
        }
        const w = this.size.width, h = this.size.height, pos1 = this.position, pos2 = range.position, size2 = range instanceof Rectangle ? range.size : { width: 0, height: 0 }, w2 = size2.width, h2 = size2.height;
        return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
    }
}
