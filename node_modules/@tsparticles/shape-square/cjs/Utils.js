"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawSquare = drawSquare;
const fixFactorSquared = 2, fixFactor = Math.sqrt(fixFactorSquared), double = 2;
function drawSquare(data) {
    const { context, radius } = data, fixedRadius = radius / fixFactor, fixedDiameter = fixedRadius * double;
    context.rect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter);
}
