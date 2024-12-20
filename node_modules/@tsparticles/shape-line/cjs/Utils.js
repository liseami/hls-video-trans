"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawLine = drawLine;
function drawLine(data) {
    const { context, particle, radius } = data, shapeData = particle.shapeData, centerY = 0;
    context.moveTo(-radius, centerY);
    context.lineTo(radius, centerY);
    context.lineCap = shapeData?.cap ?? "butt";
}
