"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawGrabLine = drawGrabLine;
exports.drawGrab = drawGrab;
const engine_1 = require("@tsparticles/engine");
const defaultWidth = 0;
function drawGrabLine(context, width, begin, end, colorLine, opacity) {
    (0, engine_1.drawLine)(context, begin, end);
    context.strokeStyle = (0, engine_1.getStyleFromRgb)(colorLine, opacity);
    context.lineWidth = width;
    context.stroke();
}
function drawGrab(container, particle, lineColor, opacity, mousePos) {
    container.canvas.draw(ctx => {
        const beginPos = particle.getPosition();
        drawGrabLine(ctx, particle.retina.linksWidth ?? defaultWidth, beginPos, mousePos, lineColor, opacity);
    });
}
