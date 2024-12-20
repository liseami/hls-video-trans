"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDrawer = void 0;
const engine_1 = require("@tsparticles/engine");
const Utils_js_1 = require("./Utils.js");
const Utils_js_2 = require("./GifUtils/Utils.js");
const double = 2, defaultAlpha = 1, sides = 12, defaultRatio = 1;
class ImageDrawer {
    constructor(engine) {
        this.validTypes = ["image", "images"];
        this.loadImageShape = async (imageShape) => {
            if (!this._engine.loadImage) {
                throw new Error(`${engine_1.errorPrefix} image shape not initialized`);
            }
            await this._engine.loadImage({
                gif: imageShape.gif,
                name: imageShape.name,
                replaceColor: imageShape.replaceColor ?? false,
                src: imageShape.src,
            });
        };
        this._engine = engine;
    }
    addImage(image) {
        if (!this._engine.images) {
            this._engine.images = [];
        }
        this._engine.images.push(image);
    }
    draw(data) {
        const { context, radius, particle, opacity } = data, image = particle.image, element = image?.element;
        if (!image) {
            return;
        }
        context.globalAlpha = opacity;
        if (image.gif && image.gifData) {
            (0, Utils_js_2.drawGif)(data);
        }
        else if (element) {
            const ratio = image.ratio, pos = {
                x: -radius,
                y: -radius,
            }, diameter = radius * double;
            context.drawImage(element, pos.x, pos.y, diameter, diameter / ratio);
        }
        context.globalAlpha = defaultAlpha;
    }
    getSidesCount() {
        return sides;
    }
    async init(container) {
        const options = container.actualOptions;
        if (!options.preload || !this._engine.loadImage) {
            return;
        }
        for (const imageData of options.preload) {
            await this._engine.loadImage(imageData);
        }
    }
    loadShape(particle) {
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }
        if (!this._engine.images) {
            this._engine.images = [];
        }
        const imageData = particle.shapeData;
        if (!imageData) {
            return;
        }
        const image = this._engine.images.find((t) => t.name === imageData.name || t.source === imageData.src);
        if (!image) {
            void this.loadImageShape(imageData).then(() => {
                this.loadShape(particle);
            });
        }
    }
    particleInit(container, particle) {
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }
        if (!this._engine.images) {
            this._engine.images = [];
        }
        const images = this._engine.images, imageData = particle.shapeData;
        if (!imageData) {
            return;
        }
        const color = particle.getFillColor(), image = images.find((t) => t.name === imageData.name || t.source === imageData.src);
        if (!image) {
            return;
        }
        const replaceColor = imageData.replaceColor ?? image.replaceColor;
        if (image.loading) {
            setTimeout(() => {
                this.particleInit(container, particle);
            });
            return;
        }
        void (async () => {
            let imageRes;
            if (image.svgData && color) {
                imageRes = await (0, Utils_js_1.replaceImageColor)(image, imageData, color, particle);
            }
            else {
                imageRes = {
                    color,
                    data: image,
                    element: image.element,
                    gif: image.gif,
                    gifData: image.gifData,
                    gifLoopCount: image.gifLoopCount,
                    loaded: true,
                    ratio: imageData.width && imageData.height
                        ? imageData.width / imageData.height
                        : (image.ratio ?? defaultRatio),
                    replaceColor: replaceColor,
                    source: imageData.src,
                };
            }
            if (!imageRes.ratio) {
                imageRes.ratio = 1;
            }
            const fill = imageData.fill ?? particle.shapeFill, close = imageData.close ?? particle.shapeClose, imageShape = {
                image: imageRes,
                fill,
                close,
            };
            particle.image = imageShape.image;
            particle.shapeFill = imageShape.fill;
            particle.shapeClose = imageShape.close;
        })();
    }
}
exports.ImageDrawer = ImageDrawer;
