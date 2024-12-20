"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriangleDrawer = void 0;
const PolygonDrawerBase_js_1 = require("./PolygonDrawerBase.js");
const yFactor = 1.66, sides = 3, double = 2;
class TriangleDrawer extends PolygonDrawerBase_js_1.PolygonDrawerBase {
    constructor() {
        super(...arguments);
        this.validTypes = ["triangle"];
    }
    getCenter(particle, radius) {
        return {
            x: -radius,
            y: radius / yFactor,
        };
    }
    getSidesCount() {
        return sides;
    }
    getSidesData(particle, radius) {
        const diameter = radius * double;
        return {
            count: {
                denominator: 2,
                numerator: 3,
            },
            length: diameter,
        };
    }
}
exports.TriangleDrawer = TriangleDrawer;
