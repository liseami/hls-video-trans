import { drawLine, getStyleFromRgb } from "@tsparticles/engine";
const defaultWidth = 0;
export function drawGrabLine(context, width, begin, end, colorLine, opacity) {
    drawLine(context, begin, end);
    context.strokeStyle = getStyleFromRgb(colorLine, opacity);
    context.lineWidth = width;
    context.stroke();
}
export function drawGrab(container, particle, lineColor, opacity, mousePos) {
    container.canvas.draw(ctx => {
        const beginPos = particle.getPosition();
        drawGrabLine(ctx, particle.retina.linksWidth ?? defaultWidth, beginPos, mousePos, lineColor, opacity);
    });
}
