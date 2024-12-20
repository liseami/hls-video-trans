import { getRangeValue, } from "@tsparticles/engine";
import { drawStar } from "./Utils.js";
const defaultInset = 2, defaultSides = 5;
export class StarDrawer {
    constructor() {
        this.validTypes = ["star"];
    }
    draw(data) {
        drawStar(data);
    }
    getSidesCount(particle) {
        const star = particle.shapeData;
        return Math.round(getRangeValue(star?.sides ?? defaultSides));
    }
    particleInit(container, particle) {
        const star = particle.shapeData;
        particle.starInset = getRangeValue(star?.inset ?? defaultInset);
    }
}
