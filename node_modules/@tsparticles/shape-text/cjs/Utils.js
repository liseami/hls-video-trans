"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawText = drawText;
const engine_1 = require("@tsparticles/engine");
const double = 2, half = 0.5;
function drawText(data) {
    const { context, particle, radius, opacity } = data, character = particle.shapeData;
    if (!character) {
        return;
    }
    const textData = character.value;
    if (textData === undefined) {
        return;
    }
    if (particle.text === undefined) {
        particle.text = (0, engine_1.itemFromSingleOrMultiple)(textData, particle.randomIndexData);
    }
    const text = particle.text, style = character.style ?? "", weight = character.weight ?? "400", size = Math.round(radius) * double, font = character.font ?? "Verdana", fill = particle.shapeFill;
    const lines = text?.split("\n");
    if (!lines) {
        return;
    }
    context.font = `${style} ${weight} ${size}px "${font}"`;
    context.globalAlpha = opacity;
    for (let i = 0; i < lines.length; i++) {
        drawLine(context, lines[i], radius, opacity, i, fill);
    }
    context.globalAlpha = 1;
}
function drawLine(context, line, radius, opacity, index, fill) {
    const offsetX = line.length * radius * half, pos = {
        x: -offsetX,
        y: radius * half,
    }, diameter = radius * double;
    if (fill) {
        context.fillText(line, pos.x, pos.y + diameter * index);
    }
    else {
        context.strokeText(line, pos.x, pos.y + diameter * index);
    }
}
