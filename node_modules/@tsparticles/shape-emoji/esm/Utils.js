export function drawEmoji(data, image) {
    const { context, opacity } = data, half = 0.5, previousAlpha = context.globalAlpha;
    if (!image) {
        return;
    }
    const diameter = image.width, radius = diameter * half;
    context.globalAlpha = opacity;
    context.drawImage(image, -radius, -radius, diameter, diameter);
    context.globalAlpha = previousAlpha;
}
