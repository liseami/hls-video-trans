(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CircleWarp = void 0;
    const engine_1 = require("@tsparticles/engine");
    const double = 2;
    class CircleWarp extends engine_1.Circle {
        constructor(x, y, radius, canvasSize) {
            super(x, y, radius);
            this.canvasSize = canvasSize;
            this.canvasSize = { ...canvasSize };
        }
        contains(point) {
            const { width, height } = this.canvasSize, { x, y } = point;
            return (super.contains(point) ||
                super.contains({ x: x - width, y }) ||
                super.contains({ x: x - width, y: y - height }) ||
                super.contains({ x, y: y - height }));
        }
        intersects(range) {
            if (super.intersects(range)) {
                return true;
            }
            const rect = range, circle = range, newPos = {
                x: range.position.x - this.canvasSize.width,
                y: range.position.y - this.canvasSize.height,
            };
            if (circle.radius !== undefined) {
                const biggerCircle = new engine_1.Circle(newPos.x, newPos.y, circle.radius * double);
                return super.intersects(biggerCircle);
            }
            else if (rect.size !== undefined) {
                const rectSW = new engine_1.Rectangle(newPos.x, newPos.y, rect.size.width * double, rect.size.height * double);
                return super.intersects(rectSW);
            }
            return false;
        }
    }
    exports.CircleWarp = CircleWarp;
});
