import { getHslAnimationFromHsl, getRangeValue, itemFromSingleOrMultiple, rangeColorToHsl, updateColor, } from "@tsparticles/engine";
const defaultOpacity = 1;
export class StrokeColorUpdater {
    constructor(container, engine) {
        this._container = container;
        this._engine = engine;
    }
    init(particle) {
        const container = this._container, options = particle.options;
        const stroke = itemFromSingleOrMultiple(options.stroke, particle.id, options.reduceDuplicates);
        particle.strokeWidth = getRangeValue(stroke.width) * container.retina.pixelRatio;
        particle.strokeOpacity = getRangeValue(stroke.opacity ?? defaultOpacity);
        particle.strokeAnimation = stroke.color?.animation;
        const strokeHslColor = rangeColorToHsl(this._engine, stroke.color) ?? particle.getFillColor();
        if (strokeHslColor) {
            particle.strokeColor = getHslAnimationFromHsl(strokeHslColor, particle.strokeAnimation, container.retina.reduceFactor);
        }
    }
    isEnabled(particle) {
        const color = particle.strokeAnimation, { strokeColor } = particle;
        return (!particle.destroyed &&
            !particle.spawning &&
            !!color &&
            ((strokeColor?.h.value !== undefined && strokeColor.h.enable) ||
                (strokeColor?.s.value !== undefined && strokeColor.s.enable) ||
                (strokeColor?.l.value !== undefined && strokeColor.l.enable)));
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateColor(particle.strokeColor, delta);
    }
}
