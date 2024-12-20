"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiDrawer = void 0;
const engine_1 = require("@tsparticles/engine");
const Utils_js_1 = require("./Utils.js");
const defaultFont = '"Twemoji Mozilla", Apple Color Emoji, "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color"', noPadding = 0;
class EmojiDrawer {
    constructor() {
        this.validTypes = ["emoji"];
        this._emojiShapeDict = new Map();
    }
    destroy() {
        for (const [key, data] of this._emojiShapeDict) {
            if (data instanceof ImageBitmap) {
                data?.close();
            }
            this._emojiShapeDict.delete(key);
        }
    }
    draw(data) {
        const key = data.particle.emojiDataKey;
        if (!key) {
            return;
        }
        const image = this._emojiShapeDict.get(key);
        if (!image) {
            return;
        }
        (0, Utils_js_1.drawEmoji)(data, image);
    }
    async init(container) {
        const options = container.actualOptions, { validTypes } = this;
        if (!validTypes.find(t => (0, engine_1.isInArray)(t, options.particles.shape.type))) {
            return;
        }
        const promises = [(0, engine_1.loadFont)(defaultFont)], shapeOptions = validTypes
            .map(t => options.particles.shape.options[t])
            .find(t => !!t);
        if (shapeOptions) {
            (0, engine_1.executeOnSingleOrMultiple)(shapeOptions, shape => {
                if (shape.font) {
                    promises.push((0, engine_1.loadFont)(shape.font));
                }
            });
        }
        await Promise.all(promises);
    }
    particleDestroy(particle) {
        particle.emojiDataKey = undefined;
    }
    particleInit(_container, particle) {
        const double = 2, shapeData = particle.shapeData;
        if (!shapeData?.value) {
            return;
        }
        const emoji = (0, engine_1.itemFromSingleOrMultiple)(shapeData.value, particle.randomIndexData);
        if (!emoji) {
            return;
        }
        const emojiOptions = typeof emoji === "string"
            ? {
                font: shapeData.font ?? defaultFont,
                padding: shapeData.padding ?? noPadding,
                value: emoji,
            }
            : {
                font: defaultFont,
                padding: noPadding,
                ...shapeData,
                ...emoji,
            }, font = emojiOptions.font, value = emojiOptions.value;
        const key = `${value}_${font}`;
        if (this._emojiShapeDict.has(key)) {
            particle.emojiDataKey = key;
            return;
        }
        const padding = emojiOptions.padding * double, maxSize = (0, engine_1.getRangeMax)(particle.size.value), fullSize = maxSize + padding, canvasSize = fullSize * double;
        let image;
        if (typeof OffscreenCanvas !== "undefined") {
            const canvas = new OffscreenCanvas(canvasSize, canvasSize), context = canvas.getContext("2d");
            if (!context) {
                return;
            }
            context.font = `400 ${maxSize * double}px ${font}`;
            context.textBaseline = "middle";
            context.textAlign = "center";
            context.fillText(value, fullSize, fullSize);
            image = canvas.transferToImageBitmap();
        }
        else {
            const canvas = document.createElement("canvas");
            canvas.width = canvasSize;
            canvas.height = canvasSize;
            const context = canvas.getContext("2d");
            if (!context) {
                return;
            }
            context.font = `400 ${maxSize * double}px ${font}`;
            context.textBaseline = "middle";
            context.textAlign = "center";
            context.fillText(value, fullSize, fullSize);
            image = canvas;
        }
        this._emojiShapeDict.set(key, image);
        particle.emojiDataKey = key;
    }
}
exports.EmojiDrawer = EmojiDrawer;
