"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCircle = drawCircle;
const double = 2, doublePI = Math.PI * double, minAngle = 0, origin = { x: 0, y: 0 };
function drawCircle(data) {
    const { context, particle, radius } = data;
    if (!particle.circleRange) {
        particle.circleRange = { min: minAngle, max: doublePI };
    }
    const circleRange = particle.circleRange;
    context.arc(origin.x, origin.y, radius, circleRange.min, circleRange.max, false);
}
