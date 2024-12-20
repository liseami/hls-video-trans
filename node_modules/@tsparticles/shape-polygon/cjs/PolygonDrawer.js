"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonDrawer = void 0;
const PolygonDrawerBase_js_1 = require("./PolygonDrawerBase.js");
const sidesCenterFactor = 3.5, yFactor = 2.66, sidesFactor = 3;
class PolygonDrawer extends PolygonDrawerBase_js_1.PolygonDrawerBase {
    constructor() {
        super(...arguments);
        this.validTypes = ["polygon"];
    }
    getCenter(particle, radius) {
        return {
            x: -radius / (particle.sides / sidesCenterFactor),
            y: -radius / (yFactor / sidesCenterFactor),
        };
    }
    getSidesData(particle, radius) {
        const sides = particle.sides;
        return {
            count: {
                denominator: 1,
                numerator: sides,
            },
            length: (radius * yFactor) / (sides / sidesFactor),
        };
    }
}
exports.PolygonDrawer = PolygonDrawer;
