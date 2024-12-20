import { degToRad, isObject } from "@tsparticles/engine";
import { drawCircle } from "./Utils.js";
const sides = 12, maxAngle = 360, minAngle = 0;
export class CircleDrawer {
    constructor() {
        this.validTypes = ["circle"];
    }
    draw(data) {
        drawCircle(data);
    }
    getSidesCount() {
        return sides;
    }
    particleInit(container, particle) {
        const shapeData = particle.shapeData, angle = shapeData?.angle ?? {
            max: maxAngle,
            min: minAngle,
        };
        particle.circleRange = !isObject(angle)
            ? {
                min: minAngle,
                max: degToRad(angle),
            }
            : { min: degToRad(angle.min), max: degToRad(angle.max) };
    }
}
