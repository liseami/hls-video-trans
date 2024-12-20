"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadTree = void 0;
const Ranges_js_1 = require("./Ranges.js");
const NumberUtils_js_1 = require("../../Utils/NumberUtils.js");
const half = 0.5, double = 2, subdivideCount = 4;
class QuadTree {
    constructor(rectangle, capacity) {
        this.rectangle = rectangle;
        this.capacity = capacity;
        this._subdivide = () => {
            const { x, y } = this.rectangle.position, { width, height } = this.rectangle.size, { capacity } = this;
            for (let i = 0; i < subdivideCount; i++) {
                const fixedIndex = i % double;
                this._subs.push(new QuadTree(new Ranges_js_1.Rectangle(x + width * half * fixedIndex, y + height * half * (Math.round(i * half) - fixedIndex), width * half, height * half), capacity));
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
        return this._subs.some(sub => sub.insert(point));
    }
    query(range, check) {
        const res = [];
        if (!range.intersects(this.rectangle)) {
            return [];
        }
        for (const p of this._points) {
            if (!range.contains(p.position) &&
                (0, NumberUtils_js_1.getDistance)(range.position, p.position) > p.particle.getRadius() &&
                (!check || check(p.particle))) {
                continue;
            }
            res.push(p.particle);
        }
        if (this._divided) {
            for (const sub of this._subs) {
                res.push(...sub.query(range, check));
            }
        }
        return res;
    }
    queryCircle(position, radius, check) {
        return this.query(new Ranges_js_1.Circle(position.x, position.y, radius), check);
    }
    queryRectangle(position, size, check) {
        return this.query(new Ranges_js_1.Rectangle(position.x, position.y, size.width, size.height), check);
    }
}
exports.QuadTree = QuadTree;
