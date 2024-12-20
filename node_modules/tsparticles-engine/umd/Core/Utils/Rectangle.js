(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Circle", "./Range"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Rectangle = void 0;
    const Circle_1 = require("./Circle");
    const Range_1 = require("./Range");
    class Rectangle extends Range_1.Range {
        constructor(x, y, width, height) {
            super(x, y);
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
            if (range instanceof Circle_1.Circle) {
                range.intersects(this);
            }
            const w = this.size.width, h = this.size.height, pos1 = this.position, pos2 = range.position, size2 = range instanceof Rectangle ? range.size : { width: 0, height: 0 }, w2 = size2.width, h2 = size2.height;
            return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
        }
    }
    exports.Rectangle = Rectangle;
});
