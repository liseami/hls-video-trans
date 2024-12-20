"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwinkleUpdater = void 0;
const engine_1 = require("@tsparticles/engine");
const Twinkle_js_1 = require("./Options/Classes/Twinkle.js");
class TwinkleUpdater {
    constructor(engine) {
        this._engine = engine;
    }
    getColorStyles(particle, context, radius, opacity) {
        const pOptions = particle.options, twinkleOptions = pOptions.twinkle;
        if (!twinkleOptions) {
            return {};
        }
        const twinkle = twinkleOptions.particles, twinkling = twinkle.enable && (0, engine_1.getRandom)() < twinkle.frequency, zIndexOptions = particle.options.zIndex, zOffset = 1, zOpacityFactor = (zOffset - particle.zIndexFactor) ** zIndexOptions.opacityRate, twinklingOpacity = twinkling ? (0, engine_1.getRangeValue)(twinkle.opacity) * zOpacityFactor : opacity, twinkleRgb = (0, engine_1.rangeColorToHsl)(this._engine, twinkle.color), twinkleStyle = twinkleRgb ? (0, engine_1.getStyleFromHsl)(twinkleRgb, twinklingOpacity) : undefined, res = {}, needsTwinkle = twinkling && twinkleStyle;
        res.fill = needsTwinkle ? twinkleStyle : undefined;
        res.stroke = needsTwinkle ? twinkleStyle : undefined;
        return res;
    }
    async init() {
        await Promise.resolve();
    }
    isEnabled(particle) {
        const pOptions = particle.options, twinkleOptions = pOptions.twinkle;
        if (!twinkleOptions) {
            return false;
        }
        return twinkleOptions.particles.enable;
    }
    loadOptions(options, ...sources) {
        if (!options.twinkle) {
            options.twinkle = new Twinkle_js_1.Twinkle();
        }
        for (const source of sources) {
            options.twinkle.load(source?.twinkle);
        }
    }
    async update() {
        await Promise.resolve();
    }
}
exports.TwinkleUpdater = TwinkleUpdater;
