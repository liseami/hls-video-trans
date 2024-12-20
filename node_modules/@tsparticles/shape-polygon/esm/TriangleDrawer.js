import { PolygonDrawerBase } from "./PolygonDrawerBase.js";
const yFactor = 1.66, sides = 3, double = 2;
export class TriangleDrawer extends PolygonDrawerBase {
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
