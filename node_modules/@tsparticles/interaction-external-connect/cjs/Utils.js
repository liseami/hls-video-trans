"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradient = gradient;
exports.drawConnectLine = drawConnectLine;
exports.lineStyle = lineStyle;
exports.drawConnection = drawConnection;
const engine_1 = require("@tsparticles/engine");
const gradientMin = 0, gradientMax = 1, defaultLinksWidth = 0;
function gradient(context, p1, p2, opacity) {
    const gradStop = Math.floor(p2.getRadius() / p1.getRadius()), color1 = p1.getFillColor(), color2 = p2.getFillColor();
    if (!color1 || !color2) {
        return;
    }
    const sourcePos = p1.getPosition(), destPos = p2.getPosition(), midRgb = (0, engine_1.colorMix)(color1, color2, p1.getRadius(), p2.getRadius()), grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
    grad.addColorStop(gradientMin, (0, engine_1.getStyleFromHsl)(color1, opacity));
    grad.addColorStop((0, engine_1.clamp)(gradStop, gradientMin, gradientMax), (0, engine_1.getStyleFromRgb)(midRgb, opacity));
    grad.addColorStop(gradientMax, (0, engine_1.getStyleFromHsl)(color2, opacity));
    return grad;
}
function drawConnectLine(context, width, lineStyle, begin, end) {
    (0, engine_1.drawLine)(context, begin, end);
    context.lineWidth = width;
    context.strokeStyle = lineStyle;
    context.stroke();
}
function lineStyle(container, ctx, p1, p2) {
    const options = container.actualOptions, connectOptions = options.interactivity.modes.connect;
    if (!connectOptions) {
        return;
    }
    return gradient(ctx, p1, p2, connectOptions.links.opacity);
}
function drawConnection(container, p1, p2) {
    container.canvas.draw(ctx => {
        const ls = lineStyle(container, ctx, p1, p2);
        if (!ls) {
            return;
        }
        const pos1 = p1.getPosition(), pos2 = p2.getPosition();
        drawConnectLine(ctx, p1.retina.linksWidth ?? defaultLinksWidth, ls, pos1, pos2);
    });
}
