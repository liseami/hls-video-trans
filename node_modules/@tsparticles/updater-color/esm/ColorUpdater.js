import { getHslAnimationFromHsl, rangeColorToHsl, updateColor, } from "@tsparticles/engine";
export class ColorUpdater {
    constructor(container, engine) {
        this._container = container;
        this._engine = engine;
    }
    init(particle) {
        const hslColor = rangeColorToHsl(this._engine, particle.options.color, particle.id, particle.options.reduceDuplicates);
        if (hslColor) {
            particle.color = getHslAnimationFromHsl(hslColor, particle.options.color.animation, this._container.retina.reduceFactor);
        }
    }
    isEnabled(particle) {
        const { h: hAnimation, s: sAnimation, l: lAnimation } = particle.options.color.animation, { color } = particle;
        return (!particle.destroyed &&
            !particle.spawning &&
            ((color?.h.value !== undefined && hAnimation.enable) ||
                (color?.s.value !== undefined && sAnimation.enable) ||
                (color?.l.value !== undefined && lAnimation.enable)));
    }
    update(particle, delta) {
        updateColor(particle.color, delta);
    }
}
