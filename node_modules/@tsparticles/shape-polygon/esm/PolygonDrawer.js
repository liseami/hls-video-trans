import { PolygonDrawerBase } from "./PolygonDrawerBase.js";
const sidesCenterFactor = 3.5, yFactor = 2.66, sidesFactor = 3;
export class PolygonDrawer extends PolygonDrawerBase {
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
