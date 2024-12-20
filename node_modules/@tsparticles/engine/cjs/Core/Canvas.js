"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const CanvasUtils_js_1 = require("../Utils/CanvasUtils.js");
const Utils_js_1 = require("../Utils/Utils.js");
const ColorUtils_js_1 = require("../Utils/ColorUtils.js");
const Constants_js_1 = require("./Utils/Constants.js");
function setTransformValue(factor, newFactor, key) {
    const newValue = newFactor[key], defaultValue = 1;
    if (newValue !== undefined) {
        factor[key] = (factor[key] ?? defaultValue) * newValue;
    }
}
function setStyle(canvas, style, important = false) {
    if (!style) {
        return;
    }
    const element = canvas;
    if (!element) {
        return;
    }
    const elementStyle = element.style;
    if (!elementStyle) {
        return;
    }
    for (const key in style) {
        const value = style[key];
        elementStyle.setProperty(key, value, important ? "important" : "");
    }
}
class Canvas {
    constructor(container, engine) {
        this.container = container;
        this._applyPostDrawUpdaters = particle => {
            for (const updater of this._postDrawUpdaters) {
                updater.afterDraw?.(particle);
            }
        };
        this._applyPreDrawUpdaters = (ctx, particle, radius, zOpacity, colorStyles, transform) => {
            for (const updater of this._preDrawUpdaters) {
                if (updater.getColorStyles) {
                    const { fill, stroke } = updater.getColorStyles(particle, ctx, radius, zOpacity);
                    if (fill) {
                        colorStyles.fill = fill;
                    }
                    if (stroke) {
                        colorStyles.stroke = stroke;
                    }
                }
                if (updater.getTransformValues) {
                    const updaterTransform = updater.getTransformValues(particle);
                    for (const key in updaterTransform) {
                        setTransformValue(transform, updaterTransform, key);
                    }
                }
                updater.beforeDraw?.(particle);
            }
        };
        this._applyResizePlugins = () => {
            for (const plugin of this._resizePlugins) {
                plugin.resize?.();
            }
        };
        this._getPluginParticleColors = particle => {
            let fColor, sColor;
            for (const plugin of this._colorPlugins) {
                if (!fColor && plugin.particleFillColor) {
                    fColor = (0, ColorUtils_js_1.rangeColorToHsl)(this._engine, plugin.particleFillColor(particle));
                }
                if (!sColor && plugin.particleStrokeColor) {
                    sColor = (0, ColorUtils_js_1.rangeColorToHsl)(this._engine, plugin.particleStrokeColor(particle));
                }
                if (fColor && sColor) {
                    break;
                }
            }
            return [fColor, sColor];
        };
        this._initCover = async () => {
            const options = this.container.actualOptions, cover = options.backgroundMask.cover, color = cover.color;
            if (color) {
                const coverRgb = (0, ColorUtils_js_1.rangeColorToRgb)(this._engine, color);
                if (coverRgb) {
                    const coverColor = {
                        ...coverRgb,
                        a: cover.opacity,
                    };
                    this._coverColorStyle = (0, ColorUtils_js_1.getStyleFromRgb)(coverColor, coverColor.a);
                }
            }
            else {
                await new Promise((resolve, reject) => {
                    if (!cover.image) {
                        return;
                    }
                    const img = document.createElement("img");
                    img.addEventListener("load", () => {
                        this._coverImage = {
                            image: img,
                            opacity: cover.opacity,
                        };
                        resolve();
                    });
                    img.addEventListener("error", evt => {
                        reject(evt.error);
                    });
                    img.src = cover.image;
                });
            }
        };
        this._initStyle = () => {
            const element = this.element, options = this.container.actualOptions;
            if (!element) {
                return;
            }
            if (this._fullScreen) {
                this._originalStyle = (0, Utils_js_1.deepExtend)({}, element.style);
                this._setFullScreenStyle();
            }
            else {
                this._resetOriginalStyle();
            }
            for (const key in options.style) {
                if (!key || !options.style) {
                    continue;
                }
                const value = options.style[key];
                if (!value) {
                    continue;
                }
                element.style.setProperty(key, value, "important");
            }
        };
        this._initTrail = async () => {
            const options = this.container.actualOptions, trail = options.particles.move.trail, trailFill = trail.fill;
            if (!trail.enable) {
                return;
            }
            const factorNumerator = 1, opacity = factorNumerator / trail.length;
            if (trailFill.color) {
                const fillColor = (0, ColorUtils_js_1.rangeColorToRgb)(this._engine, trailFill.color);
                if (!fillColor) {
                    return;
                }
                this._trailFill = {
                    color: {
                        ...fillColor,
                    },
                    opacity,
                };
            }
            else {
                await new Promise((resolve, reject) => {
                    if (!trailFill.image) {
                        return;
                    }
                    const img = document.createElement("img");
                    img.addEventListener("load", () => {
                        this._trailFill = {
                            image: img,
                            opacity,
                        };
                        resolve();
                    });
                    img.addEventListener("error", evt => {
                        reject(evt.error);
                    });
                    img.src = trailFill.image;
                });
            }
        };
        this._paintBase = baseColor => {
            this.draw(ctx => (0, CanvasUtils_js_1.paintBase)(ctx, this.size, baseColor));
        };
        this._paintImage = (image, opacity) => {
            this.draw(ctx => (0, CanvasUtils_js_1.paintImage)(ctx, this.size, image, opacity));
        };
        this._repairStyle = () => {
            const element = this.element;
            if (!element) {
                return;
            }
            this._safeMutationObserver(observer => observer.disconnect());
            this._initStyle();
            this.initBackground();
            this._safeMutationObserver(observer => {
                if (!element || !(element instanceof Node)) {
                    return;
                }
                observer.observe(element, { attributes: true });
            });
        };
        this._resetOriginalStyle = () => {
            const element = this.element, originalStyle = this._originalStyle;
            if (!(element && originalStyle)) {
                return;
            }
            setStyle(element, originalStyle);
        };
        this._safeMutationObserver = callback => {
            if (!this._mutationObserver) {
                return;
            }
            callback(this._mutationObserver);
        };
        this._setFullScreenStyle = () => {
            const element = this.element;
            if (!element) {
                return;
            }
            const radix = 10, zIndex = this.container.actualOptions.fullScreen.zIndex.toString(radix);
            setStyle(element, {
                position: "fixed",
                "z-index": zIndex,
                zIndex: zIndex,
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
            }, true);
        };
        this._engine = engine;
        this._standardSize = {
            height: 0,
            width: 0,
        };
        const pxRatio = container.retina.pixelRatio, stdSize = this._standardSize;
        this.size = {
            height: stdSize.height * pxRatio,
            width: stdSize.width * pxRatio,
        };
        this._context = null;
        this._generated = false;
        this._preDrawUpdaters = [];
        this._postDrawUpdaters = [];
        this._resizePlugins = [];
        this._colorPlugins = [];
    }
    get _fullScreen() {
        return this.container.actualOptions.fullScreen.enable;
    }
    clear() {
        const options = this.container.actualOptions, trail = options.particles.move.trail, trailFill = this._trailFill, minimumLength = 0;
        if (options.backgroundMask.enable) {
            this.paint();
        }
        else if (trail.enable && trail.length > minimumLength && trailFill) {
            if (trailFill.color) {
                this._paintBase((0, ColorUtils_js_1.getStyleFromRgb)(trailFill.color, trailFill.opacity));
            }
            else if (trailFill.image) {
                this._paintImage(trailFill.image, trailFill.opacity);
            }
        }
        else if (options.clear) {
            this.draw(ctx => {
                (0, CanvasUtils_js_1.clear)(ctx, this.size);
            });
        }
    }
    destroy() {
        this.stop();
        if (this._generated) {
            const element = this.element;
            element?.remove();
        }
        else {
            this._resetOriginalStyle();
        }
        this._preDrawUpdaters = [];
        this._postDrawUpdaters = [];
        this._resizePlugins = [];
        this._colorPlugins = [];
    }
    draw(cb) {
        const ctx = this._context;
        if (!ctx) {
            return;
        }
        return cb(ctx);
    }
    drawAsync(cb) {
        const ctx = this._context;
        if (!ctx) {
            return undefined;
        }
        return cb(ctx);
    }
    drawParticle(particle, delta) {
        if (particle.spawning || particle.destroyed) {
            return;
        }
        const radius = particle.getRadius(), minimumSize = 0;
        if (radius <= minimumSize) {
            return;
        }
        const pfColor = particle.getFillColor(), psColor = particle.getStrokeColor() ?? pfColor;
        let [fColor, sColor] = this._getPluginParticleColors(particle);
        if (!fColor) {
            fColor = pfColor;
        }
        if (!sColor) {
            sColor = psColor;
        }
        if (!fColor && !sColor) {
            return;
        }
        this.draw((ctx) => {
            const container = this.container, options = container.actualOptions, zIndexOptions = particle.options.zIndex, zIndexFactorOffset = 1, zIndexFactor = zIndexFactorOffset - particle.zIndexFactor, zOpacityFactor = zIndexFactor ** zIndexOptions.opacityRate, defaultOpacity = 1, opacity = particle.bubble.opacity ?? particle.opacity?.value ?? defaultOpacity, strokeOpacity = particle.strokeOpacity ?? opacity, zOpacity = opacity * zOpacityFactor, zStrokeOpacity = strokeOpacity * zOpacityFactor, transform = {}, colorStyles = {
                fill: fColor ? (0, ColorUtils_js_1.getStyleFromHsl)(fColor, zOpacity) : undefined,
            };
            colorStyles.stroke = sColor ? (0, ColorUtils_js_1.getStyleFromHsl)(sColor, zStrokeOpacity) : colorStyles.fill;
            this._applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform);
            (0, CanvasUtils_js_1.drawParticle)({
                container,
                context: ctx,
                particle,
                delta,
                colorStyles,
                backgroundMask: options.backgroundMask.enable,
                composite: options.backgroundMask.composite,
                radius: radius * zIndexFactor ** zIndexOptions.sizeRate,
                opacity: zOpacity,
                shadow: particle.options.shadow,
                transform,
            });
            this._applyPostDrawUpdaters(particle);
        });
    }
    drawParticlePlugin(plugin, particle, delta) {
        this.draw(ctx => (0, CanvasUtils_js_1.drawParticlePlugin)(ctx, plugin, particle, delta));
    }
    drawPlugin(plugin, delta) {
        this.draw(ctx => (0, CanvasUtils_js_1.drawPlugin)(ctx, plugin, delta));
    }
    async init() {
        this._safeMutationObserver(obs => obs.disconnect());
        this._mutationObserver = (0, Utils_js_1.safeMutationObserver)(records => {
            for (const record of records) {
                if (record.type === "attributes" && record.attributeName === "style") {
                    this._repairStyle();
                }
            }
        });
        this.resize();
        this._initStyle();
        await this._initCover();
        try {
            await this._initTrail();
        }
        catch (e) {
            (0, Utils_js_1.getLogger)().error(e);
        }
        this.initBackground();
        this._safeMutationObserver(obs => {
            if (!this.element || !(this.element instanceof Node)) {
                return;
            }
            obs.observe(this.element, { attributes: true });
        });
        this.initUpdaters();
        this.initPlugins();
        this.paint();
    }
    initBackground() {
        const options = this.container.actualOptions, background = options.background, element = this.element;
        if (!element) {
            return;
        }
        const elementStyle = element.style;
        if (!elementStyle) {
            return;
        }
        if (background.color) {
            const color = (0, ColorUtils_js_1.rangeColorToRgb)(this._engine, background.color);
            elementStyle.backgroundColor = color ? (0, ColorUtils_js_1.getStyleFromRgb)(color, background.opacity) : "";
        }
        else {
            elementStyle.backgroundColor = "";
        }
        elementStyle.backgroundImage = background.image || "";
        elementStyle.backgroundPosition = background.position || "";
        elementStyle.backgroundRepeat = background.repeat || "";
        elementStyle.backgroundSize = background.size || "";
    }
    initPlugins() {
        this._resizePlugins = [];
        for (const plugin of this.container.plugins.values()) {
            if (plugin.resize) {
                this._resizePlugins.push(plugin);
            }
            if (plugin.particleFillColor ?? plugin.particleStrokeColor) {
                this._colorPlugins.push(plugin);
            }
        }
    }
    initUpdaters() {
        this._preDrawUpdaters = [];
        this._postDrawUpdaters = [];
        for (const updater of this.container.particles.updaters) {
            if (updater.afterDraw) {
                this._postDrawUpdaters.push(updater);
            }
            if (updater.getColorStyles ?? updater.getTransformValues ?? updater.beforeDraw) {
                this._preDrawUpdaters.push(updater);
            }
        }
    }
    loadCanvas(canvas) {
        if (this._generated && this.element) {
            this.element.remove();
        }
        this._generated =
            canvas.dataset && Constants_js_1.generatedAttribute in canvas.dataset
                ? canvas.dataset[Constants_js_1.generatedAttribute] === "true"
                : this._generated;
        this.element = canvas;
        this.element.ariaHidden = "true";
        this._originalStyle = (0, Utils_js_1.deepExtend)({}, this.element.style);
        const standardSize = this._standardSize;
        standardSize.height = canvas.offsetHeight;
        standardSize.width = canvas.offsetWidth;
        const pxRatio = this.container.retina.pixelRatio, retinaSize = this.size;
        canvas.height = retinaSize.height = standardSize.height * pxRatio;
        canvas.width = retinaSize.width = standardSize.width * pxRatio;
        this._context = this.element.getContext("2d");
        this._safeMutationObserver(obs => {
            if (!this.element || !(this.element instanceof Node)) {
                return;
            }
            obs.observe(this.element, { attributes: true });
        });
        this.container.retina.init();
        this.initBackground();
    }
    paint() {
        const options = this.container.actualOptions;
        this.draw(ctx => {
            if (options.backgroundMask.enable && options.backgroundMask.cover) {
                (0, CanvasUtils_js_1.clear)(ctx, this.size);
                if (this._coverImage) {
                    this._paintImage(this._coverImage.image, this._coverImage.opacity);
                }
                else if (this._coverColorStyle) {
                    this._paintBase(this._coverColorStyle);
                }
                else {
                    this._paintBase();
                }
            }
            else {
                this._paintBase();
            }
        });
    }
    resize() {
        if (!this.element) {
            return false;
        }
        const container = this.container, currentSize = container.canvas._standardSize, newSize = {
            width: this.element.offsetWidth,
            height: this.element.offsetHeight,
        }, pxRatio = container.retina.pixelRatio, retinaSize = {
            width: newSize.width * pxRatio,
            height: newSize.height * pxRatio,
        };
        if (newSize.height === currentSize.height &&
            newSize.width === currentSize.width &&
            retinaSize.height === this.element.height &&
            retinaSize.width === this.element.width) {
            return false;
        }
        const oldSize = { ...currentSize };
        currentSize.height = newSize.height;
        currentSize.width = newSize.width;
        const canvasSize = this.size;
        this.element.width = canvasSize.width = retinaSize.width;
        this.element.height = canvasSize.height = retinaSize.height;
        if (this.container.started) {
            container.particles.setResizeFactor({
                width: currentSize.width / oldSize.width,
                height: currentSize.height / oldSize.height,
            });
        }
        return true;
    }
    stop() {
        this._safeMutationObserver(obs => obs.disconnect());
        this._mutationObserver = undefined;
        this.draw(ctx => (0, CanvasUtils_js_1.clear)(ctx, this.size));
    }
    async windowResize() {
        if (!this.element || !this.resize()) {
            return;
        }
        const container = this.container, needsRefresh = container.updateActualOptions();
        container.particles.setDensity();
        this._applyResizePlugins();
        if (needsRefresh) {
            await container.refresh();
        }
    }
}
exports.Canvas = Canvas;
