import { getRangeValue, } from "@tsparticles/engine";
import { drawPolygon } from "./Utils.js";
const defaultSides = 5;
export class PolygonDrawerBase {
    draw(data) {
        const { particle, radius } = data, start = this.getCenter(particle, radius), side = this.getSidesData(particle, radius);
        drawPolygon(data, start, side);
    }
    getSidesCount(particle) {
        const polygon = particle.shapeData;
        return Math.round(getRangeValue(polygon?.sides ?? defaultSides));
    }
}
