import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
import { getDistance } from "../../Utils/NumberUtils";
export class QuadTree {
    constructor(rectangle, capacity) {
        this.rectangle = rectangle;
        this.capacity = capacity;
        this._subdivide = () => {
            const { x, y } = this.rectangle.position, { width, height } = this.rectangle.size, { capacity } = this;
            for (let i = 0; i < 4; i++) {
                this._subs.push(new QuadTree(new Rectangle(x + (width / 2) * (i % 2), y + (height / 2) * (Math.round(i / 2) - (i % 2)), width / 2, height / 2), capacity));
            }
            this._divided = true;
        };
        this._points = [];
        this._divided = false;
        this._subs = [];
    }
    insert(point) {
        if (!this.rectangle.contains(point.position)) {
            return false;
        }
        if (this._points.length < this.capacity) {
            this._points.push(point);
            return true;
        }
        if (!this._divided) {
            this._subdivide();
        }
        return this._subs.some((sub) => sub.insert(point));
    }
    query(range, check, found) {
        const res = found || [];
        if (!range.intersects(this.rectangle)) {
            return [];
        }
        for (const p of this._points) {
            if (!range.contains(p.position) &&
                getDistance(range.position, p.position) > p.particle.getRadius() &&
                (!check || check(p.particle))) {
                continue;
            }
            res.push(p.particle);
        }
        if (this._divided) {
            for (const sub of this._subs) {
                sub.query(range, check, res);
            }
        }
        return res;
    }
    queryCircle(position, radius, check) {
        return this.query(new Circle(position.x, position.y, radius), check);
    }
    queryRectangle(position, size, check) {
        return this.query(new Rectangle(position.x, position.y, size.width, size.height), check);
    }
}
