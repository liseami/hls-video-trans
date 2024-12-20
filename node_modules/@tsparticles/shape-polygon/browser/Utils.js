import { degToRad } from "@tsparticles/engine";
const piDeg = 180, origin = { x: 0, y: 0 }, sidesOffset = 2;
export function drawPolygon(data, start, side) {
    const { context } = data, sideCount = side.count.numerator * side.count.denominator, decimalSides = side.count.numerator / side.count.denominator, interiorAngleDegrees = (piDeg * (decimalSides - sidesOffset)) / decimalSides, interiorAngle = Math.PI - degToRad(interiorAngleDegrees);
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
