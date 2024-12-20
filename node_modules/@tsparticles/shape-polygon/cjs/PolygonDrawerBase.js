"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonDrawerBase = void 0;
const engine_1 = require("@tsparticles/engine");
const Utils_js_1 = require("./Utils.js");
const defaultSides = 5;
class PolygonDrawerBase {
    draw(data) {
        const { particle, radius } = data, start = this.getCenter(particle, radius), side = this.getSidesData(particle, radius);
        (0, Utils_js_1.drawPolygon)(data, start, side);
    }
    getSidesCount(particle) {
        const polygon = particle.shapeData;
        return Math.round((0, engine_1.getRangeValue)(polygon?.sides ?? defaultSides));
    }
}
exports.PolygonDrawerBase = PolygonDrawerBase;
