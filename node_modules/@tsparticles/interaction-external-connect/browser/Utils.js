import { clamp, colorMix, drawLine, getStyleFromHsl, getStyleFromRgb, } from "@tsparticles/engine";
const gradientMin = 0, gradientMax = 1, defaultLinksWidth = 0;
export function gradient(context, p1, p2, opacity) {
    const gradStop = Math.floor(p2.getRadius() / p1.getRadius()), color1 = p1.getFillColor(), color2 = p2.getFillColor();
    if (!color1 || !color2) {
        return;
    }
    const sourcePos = p1.getPosition(), destPos = p2.getPosition(), midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius()), grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
    grad.addColorStop(gradientMin, getStyleFromHsl(color1, opacity));
    grad.addColorStop(clamp(gradStop, gradientMin, gradientMax), getStyleFromRgb(midRgb, opacity));
    grad.addColorStop(gradientMax, getStyleFromHsl(color2, opacity));
    return grad;
}
export function drawConnectLine(context, width, lineStyle, begin, end) {
    drawLine(context, begin, end);
    context.lineWidth = width;
    context.strokeStyle = lineStyle;
    context.stroke();
}
export function lineStyle(container, ctx, p1, p2) {
    const options = container.actualOptions, connectOptions = options.interactivity.modes.connect;
    if (!connectOptions) {
        return;
    }
    return gradient(ctx, p1, p2, connectOptions.links.opacity);
}
export function drawConnection(container, p1, p2) {
    container.canvas.draw(ctx => {
        const ls = lineStyle(container, ctx, p1, p2);
        if (!ls) {
            return;
        }
        const pos1 = p1.getPosition(), pos2 = p2.getPosition();
        drawConnectLine(ctx, p1.retina.linksWidth ?? defaultLinksWidth, ls, pos1, pos2);
    });
}
