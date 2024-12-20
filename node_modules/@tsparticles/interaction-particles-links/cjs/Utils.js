"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawTriangle = drawTriangle;
exports.drawLinkLine = drawLinkLine;
exports.drawLinkTriangle = drawLinkTriangle;
exports.getLinkKey = getLinkKey;
exports.setLinkFrequency = setLinkFrequency;
const engine_1 = require("@tsparticles/engine");
function drawTriangle(context, p1, p2, p3) {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
}
function drawLinkLine(params) {
    let drawn = false;
    const { begin, end, engine, maxDistance, context, canvasSize, width, backgroundMask, colorLine, opacity, links } = params;
    if ((0, engine_1.getDistance)(begin, end) <= maxDistance) {
        (0, engine_1.drawLine)(context, begin, end);
        drawn = true;
    }
    else if (links.warp) {
        let pi1;
        let pi2;
        const endNE = {
            x: end.x - canvasSize.width,
            y: end.y,
        };
        const d1 = (0, engine_1.getDistances)(begin, endNE);
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
            const d2 = (0, engine_1.getDistances)(begin, endSW);
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
                const d3 = (0, engine_1.getDistances)(begin, endSE);
                if (d3.distance <= maxDistance) {
                    const yi = begin.y - (d3.dy / d3.dx) * begin.x;
                    const xi = -yi / (d3.dy / d3.dx);
                    pi1 = { x: xi, y: yi };
                    pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
                }
            }
        }
        if (pi1 && pi2) {
            (0, engine_1.drawLine)(context, begin, pi1);
            (0, engine_1.drawLine)(context, end, pi2);
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
    context.strokeStyle = (0, engine_1.getStyleFromRgb)(colorLine, opacity);
    const { shadow } = links;
    if (shadow.enable) {
        const shadowColor = (0, engine_1.rangeColorToRgb)(engine, shadow.color);
        if (shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = (0, engine_1.getStyleFromRgb)(shadowColor);
        }
    }
    context.stroke();
}
function drawLinkTriangle(params) {
    const { context, pos1, pos2, pos3, backgroundMask, colorTriangle, opacityTriangle } = params;
    drawTriangle(context, pos1, pos2, pos3);
    if (backgroundMask.enable) {
        context.globalCompositeOperation = backgroundMask.composite;
    }
    context.fillStyle = (0, engine_1.getStyleFromRgb)(colorTriangle, opacityTriangle);
    context.fill();
}
function getLinkKey(ids) {
    ids.sort((a, b) => a - b);
    return ids.join("_");
}
function setLinkFrequency(particles, dictionary) {
    const key = getLinkKey(particles.map(t => t.id));
    let res = dictionary.get(key);
    if (res === undefined) {
        res = (0, engine_1.getRandom)();
        dictionary.set(key, res);
    }
    return res;
}
