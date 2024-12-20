import { clear, drawParticle, drawParticlePlugin, drawPlugin, paintBase, paintImage } from "../Utils/CanvasUtils";
import { deepExtend, getLogger, safeMutationObserver } from "../Utils/Utils";
import { getStyleFromHsl, getStyleFromRgb, rangeColorToHsl, rangeColorToRgb } from "../Utils/ColorUtils";
import { generatedAttribute } from "./Utils/Constants";
function setTransformValue(factor, newFactor, key) {
    const newValue = newFactor[key];
    if (newValue !== undefined) {
        factor[key] = (factor[key] ?? 1) * newValue;
    }
}
export class Canvas {
    constructor(container) {
        this.container = container;
        this._applyPostDrawUpdaters = (particle) => {
            for (const updater of this._postDrawUpdaters) {
                updater.afterDraw && updater.afterDraw(particle);
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
                updater.beforeDraw && updater.beforeDraw(particle);
            }
        };
        this._applyResizePlugins = () => {
            for (const plugin of this._resizePlugins) {
                plugin.resize && plugin.resize();
            }
        };
        this._getPluginParticleColors = (particle) => {
            let fColor, sColor;
            for (const plugin of this._colorPlugins) {
                if (!fColor && plugin.particleFillColor) {
                    fColor = rangeColorToHsl(plugin.particleFillColor(particle));
                }
                if (!sColor && plugin.particleStrokeColor) {
                    sColor = rangeColorToHsl(plugin.particleStrokeColor(particle));
                }
                if (fColor && sColor) {
                    break;
                }
            }
            return [fColor, sColor];
        };
        this._initCover = () => {
            const options = this.container.actualOptions, cover = options.backgroundMask.cover, color = cover.color, coverRgb = rangeColorToRgb(color);
            if (coverRgb) {
                const coverColor = {
                    ...coverRgb,
                    a: cover.opacity,
                };
                this._coverColorStyle = getStyleFromRgb(coverColor, coverColor.a);
            }
        };
        this._initStyle = () => {
            const element = this.element, options = this.container.actualOptions;
            if (!element) {
                return;
            }
            if (this._fullScreen) {
                this._originalStyle = deepExtend({}, element.style);
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
            if (trailFill.color) {
                const fillColor = rangeColorToRgb(trailFill.color);
                if (!fillColor) {
                    return;
                }
                const trail = options.particles.move.trail;
                this._trailFill = {
                    color: {
                        ...fillColor,
                    },
                    opacity: 1 / trail.length,
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
                            opacity: 1 / trail.length,
                        };
                        resolve();
                    });
                    img.addEventListener("error", (evt) => {
                        reject(evt.error);
                    });
                    img.src = trailFill.image;
                });
            }
        };
        this._paintBase = (baseColor) => {
            this.draw((ctx) => paintBase(ctx, this.size, baseColor));
        };
        this._paintImage = (image, opacity) => {
            this.draw((ctx) => paintImage(ctx, this.size, image, opacity));
        };
        this._repairStyle = () => {
            const element = this.element;
            if (!element) {
                return;
            }
            this._safeMutationObserver((observer) => observer.disconnect());
            this._initStyle();
            this.initBackground();
            this._safeMutationObserver((observer) => observer.observe(element, { attributes: true }));
        };
        this._resetOriginalStyle = () => {
            const element = this.element, originalStyle = this._originalStyle;
            if (!(element && originalStyle)) {
                return;
            }
            const style = element.style;
            style.position = originalStyle.position;
            style.zIndex = originalStyle.zIndex;
            style.top = originalStyle.top;
            style.left = originalStyle.left;
            style.width = originalStyle.width;
            style.height = originalStyle.height;
        };
        this._safeMutationObserver = (callback) => {
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
            const priority = "important", style = element.style;
            style.setProperty("position", "fixed", priority);
            style.setProperty("z-index", this.container.actualOptions.fullScreen.zIndex.toString(10), priority);
            style.setProperty("top", "0", priority);
            style.setProperty("left", "0", priority);
            style.setProperty("width", "100%", priority);
            style.setProperty("height", "100%", priority);
        };
        this.size = {
            height: 0,
            width: 0,
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
        const options = this.container.actualOptions, trail = options.particles.move.trail, trailFill = this._trailFill;
        if (options.backgroundMask.enable) {
            this.paint();
        }
        else if (trail.enable && trail.length > 0 && trailFill) {
            if (trailFill.color) {
                this._paintBase(getStyleFromRgb(trailFill.color, trailFill.opacity));
            }
            else if (trailFill.image) {
                this._paintImage(trailFill.image, trailFill.opacity);
            }
        }
        else {
            this.draw((ctx) => {
                clear(ctx, this.size);
            });
        }
    }
    destroy() {
        this.stop();
        if (this._generated) {
            const element = this.element;
            element && element.remove();
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
    drawParticle(particle, delta) {
        if (particle.spawning || particle.destroyed) {
            return;
        }
        const radius = particle.getRadius();
        if (radius <= 0) {
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
            const container = this.container, options = container.actualOptions, zIndexOptions = particle.options.zIndex, zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate, opacity = particle.bubble.opacity ?? particle.opacity?.value ?? 1, strokeOpacity = particle.strokeOpacity ?? opacity, zOpacity = opacity * zOpacityFactor, zStrokeOpacity = strokeOpacity * zOpacityFactor, transform = {}, colorStyles = {
                fill: fColor ? getStyleFromHsl(fColor, zOpacity) : undefined,
            };
            colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;
            this._applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform);
            drawParticle({
                container,
                context: ctx,
                particle,
                delta,
                colorStyles,
                backgroundMask: options.backgroundMask.enable,
                composite: options.backgroundMask.composite,
                radius: radius * (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate,
                opacity: zOpacity,
                shadow: particle.options.shadow,
                transform,
            });
            this._applyPostDrawUpdaters(particle);
        });
    }
    drawParticlePlugin(plugin, particle, delta) {
        this.draw((ctx) => drawParticlePlugin(ctx, plugin, particle, delta));
    }
    drawPlugin(plugin, delta) {
        this.draw((ctx) => drawPlugin(ctx, plugin, delta));
    }
    async init() {
        this._safeMutationObserver((obs) => obs.disconnect());
        this._mutationObserver = safeMutationObserver((records) => {
            for (const record of records) {
                if (record.type === "attributes" && record.attributeName === "style") {
                    this._repairStyle();
                }
            }
        });
        this.resize();
        this._initStyle();
        this._initCover();
        try {
            await this._initTrail();
        }
        catch (e) {
            getLogger().error(e);
        }
        this.initBackground();
        this._safeMutationObserver((obs) => {
            if (!this.element) {
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
            const color = rangeColorToRgb(background.color);
            elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "";
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
        for (const [, plugin] of this.container.plugins) {
            if (plugin.resize) {
                this._resizePlugins.push(plugin);
            }
            if (plugin.particleFillColor || plugin.particleStrokeColor) {
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
            if (updater.getColorStyles || updater.getTransformValues || updater.beforeDraw) {
                this._preDrawUpdaters.push(updater);
            }
        }
    }
    loadCanvas(canvas) {
        if (this._generated && this.element) {
            this.element.remove();
        }
        this._generated =
            canvas.dataset && generatedAttribute in canvas.dataset
                ? canvas.dataset[generatedAttribute] === "true"
                : this._generated;
        this.element = canvas;
        this.element.ariaHidden = "true";
        this._originalStyle = deepExtend({}, this.element.style);
        this.size.height = canvas.offsetHeight;
        this.size.width = canvas.offsetWidth;
        this._context = this.element.getContext("2d");
        this._safeMutationObserver((obs) => {
            if (!this.element) {
                return;
            }
            obs.observe(this.element, { attributes: true });
        });
        this.container.retina.init();
        this.initBackground();
    }
    paint() {
        const options = this.container.actualOptions;
        this.draw((ctx) => {
            if (options.backgroundMask.enable && options.backgroundMask.cover) {
                clear(ctx, this.size);
                this._paintBase(this._coverColorStyle);
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
        const container = this.container, pxRatio = container.retina.pixelRatio, size = container.canvas.size, newSize = {
            width: this.element.offsetWidth * pxRatio,
            height: this.element.offsetHeight * pxRatio,
        };
        if (newSize.height === size.height &&
            newSize.width === size.width &&
            newSize.height === this.element.height &&
            newSize.width === this.element.width) {
            return false;
        }
        const oldSize = { ...size };
        this.element.width = size.width = this.element.offsetWidth * pxRatio;
        this.element.height = size.height = this.element.offsetHeight * pxRatio;
        if (this.container.started) {
            this.resizeFactor = {
                width: size.width / oldSize.width,
                height: size.height / oldSize.height,
            };
        }
        return true;
    }
    stop() {
        this._safeMutationObserver((obs) => obs.disconnect());
        this._mutationObserver = undefined;
        this.draw((ctx) => clear(ctx, this.size));
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
