"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawPolygon = drawPolygon;
const engine_1 = require("@tsparticles/engine");
const piDeg = 180, origin = { x: 0, y: 0 }, sidesOffset = 2;
function drawPolygon(data, start, side) {
    const { context } = data, sideCount = side.count.numerator * side.count.denominator, decimalSides = side.count.numerator / side.count.denominator, interiorAngleDegrees = (piDeg * (decimalSides - sidesOffset)) / decimalSides, interiorAngle = Math.PI - (0, engine_1.degToRad)(interiorAngleDegrees);
    if (!context) {
        return;
    }
    context.beginPath();
    context.translate(start.x, start.y);
    context.moveTo(origin.x, origin.y);
    for (let i = 0; i < sideCount; i++) {
        context.lineTo(side.length, origin.y);
        context.translate(side.length, origin.y);
        context.rotate(interiorAngle);
    }
}
