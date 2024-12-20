import { executeOnSingleOrMultiple, isInArray, itemFromSingleOrMultiple, loadFont, } from "@tsparticles/engine";
import { drawText } from "./Utils.js";
export class TextDrawer {
    constructor() {
        this.validTypes = ["text", "character", "char", "multiline-text"];
    }
    draw(data) {
        drawText(data);
    }
    async init(container) {
        const options = container.actualOptions, { validTypes } = this;
        if (validTypes.find(t => isInArray(t, options.particles.shape.type))) {
            const shapeOptions = validTypes
                .map(t => options.particles.shape.options[t])
                .find(t => !!t), promises = [];
            executeOnSingleOrMultiple(shapeOptions, shape => {
                promises.push(loadFont(shape.font, shape.weight));
            });
            await Promise.all(promises);
        }
    }
    particleInit(container, particle) {
        if (!particle.shape || !this.validTypes.includes(particle.shape)) {
            return;
        }
        const character = particle.shapeData;
        if (character === undefined) {
            return;
        }
        const textData = character.value;
        if (textData === undefined) {
            return;
        }
        particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
    }
}
