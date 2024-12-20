"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextDrawer = void 0;
const engine_1 = require("@tsparticles/engine");
const Utils_js_1 = require("./Utils.js");
class TextDrawer {
    constructor() {
        this.validTypes = ["text", "character", "char", "multiline-text"];
    }
    draw(data) {
        (0, Utils_js_1.drawText)(data);
    }
    async init(container) {
        const options = container.actualOptions, { validTypes } = this;
        if (validTypes.find(t => (0, engine_1.isInArray)(t, options.particles.shape.type))) {
            const shapeOptions = validTypes
                .map(t => options.particles.shape.options[t])
                .find(t => !!t), promises = [];
            (0, engine_1.executeOnSingleOrMultiple)(shapeOptions, shape => {
                promises.push((0, engine_1.loadFont)(shape.font, shape.weight));
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
        particle.text = (0, engine_1.itemFromSingleOrMultiple)(textData, particle.randomIndexData);
    }
}
exports.TextDrawer = TextDrawer;
