import { drawLine, getDistance, getDistances, getRandom, getStyleFromRgb, rangeColorToRgb, } from "@tsparticles/engine";
export function drawTriangle(context, p1, p2, p3) {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
}
export function drawLinkLine(params) {
    let drawn = false;
    const { begin, end, engine, maxDistance, context, canvasSize, width, backgroundMask, colorLine, opacity, links } = params;
    if (getDistance(begin, end) <= maxDistance) {
        drawLine(context, begin, end);
        drawn = true;
    }
    else if (links.warp) {
        let pi1;
        let pi2;
        const endNE = {
            x: end.x - canvasSize.width,
            y: end.y,
        };
        const d1 = getDistances(begin, endNE);
        if (d1.distance <= maxDistance) {
            const yi = begin.y - (d1.dy / d1.dx) * begin.x;
            pi1 = { x: 0, y: yi };
            pi2 = { x: canvasSize.width, y: yi };
        }
        else {
            const endSW = {
                x: end.x,
                y: end.y - canvasSize.height,
            };
            const d2 = getDistances(begin, endSW);
            if (d2.distance <= maxDistance) {
                const yi = begin.y - (d2.dy / d2.dx) * begin.x;
                const xi = -yi / (d2.dy / d2.dx);
                pi1 = { x: xi, y: 0 };
                pi2 = { x: xi, y: canvasSize.height };
            }
            else {
                const endSE = {
                    x: end.x - canvasSize.width,
                    y: end.y - canvasSize.height,
                };
                const d3 = getDistances(begin, endSE);
                if (d3.distance <= maxDistance) {
                    const yi = begin.y - (d3.dy / d3.dx) * begin.x;
                    const xi = -yi / (d3.dy / d3.dx);
                    pi1 = { x: xi, y: yi };
                    pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
                }
            }
        }
        if (pi1 && pi2) {
            drawLine(context, begin, pi1);
            drawLine(context, end, pi2);
            drawn = true;
        }
    }
    if (!drawn) {
        return;
    }
    context.lineWidth = width;
    if (backgroundMask.enable) {
        context.globalCompositeOperation = backgroundMask.composite;
    }
    context.strokeStyle = getStyleFromRgb(colorLine, opacity);
    const { shadow } = links;
    if (shadow.enable) {
        const shadowColor = rangeColorToRgb(engine, shadow.color);
        if (shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = getStyleFromRgb(shadowColor);
        }
    }
    context.stroke();
}
export function drawLinkTriangle(params) {
    const { context, pos1, pos2, pos3, backgroundMask, colorTriangle, opacityTriangle } = params;
    drawTriangle(context, pos1, pos2, pos3);
    if (backgroundMask.enable) {
        context.globalCompositeOperation = backgroundMask.composite;
    }
    context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);
    context.fill();
}
export function getLinkKey(ids) {
    ids.sort((a, b) => a - b);
    return ids.join("_");
}
export function setLinkFrequency(particles, dictionary) {
    const key = getLinkKey(particles.map(t => t.id));
    let res = dictionary.get(key);
    if (res === undefined) {
        res = getRandom();
        dictionary.set(key, res);
    }
    return res;
}
