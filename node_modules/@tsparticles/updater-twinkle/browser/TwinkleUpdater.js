import { getRandom, getRangeValue, getStyleFromHsl, rangeColorToHsl, } from "@tsparticles/engine";
import { Twinkle } from "./Options/Classes/Twinkle.js";
export class TwinkleUpdater {
    constructor(engine) {
        this._engine = engine;
    }
    getColorStyles(particle, context, radius, opacity) {
        const pOptions = particle.options, twinkleOptions = pOptions.twinkle;
        if (!twinkleOptions) {
            return {};
        }
        const twinkle = twinkleOptions.particles, twinkling = twinkle.enable && getRandom() < twinkle.frequency, zIndexOptions = particle.options.zIndex, zOffset = 1, zOpacityFactor = (zOffset - particle.zIndexFactor) ** zIndexOptions.opacityRate, twinklingOpacity = twinkling ? getRangeValue(twinkle.opacity) * zOpacityFactor : opacity, twinkleRgb = rangeColorToHsl(this._engine, twinkle.color), twinkleStyle = twinkleRgb ? getStyleFromHsl(twinkleRgb, twinklingOpacity) : undefined, res = {}, needsTwinkle = twinkling && twinkleStyle;
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
            options.twinkle = new Twinkle();
        }
        for (const source of sources) {
            options.twinkle.load(source?.twinkle);
        }
    }
    async update() {
        await Promise.resolve();
    }
}
