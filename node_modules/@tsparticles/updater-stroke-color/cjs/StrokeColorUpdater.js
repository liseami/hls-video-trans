"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrokeColorUpdater = void 0;
const engine_1 = require("@tsparticles/engine");
const defaultOpacity = 1;
class StrokeColorUpdater {
    constructor(container, engine) {
        this._container = container;
        this._engine = engine;
    }
    init(particle) {
        const container = this._container, options = particle.options;
        const stroke = (0, engine_1.itemFromSingleOrMultiple)(options.stroke, particle.id, options.reduceDuplicates);
        particle.strokeWidth = (0, engine_1.getRangeValue)(stroke.width) * container.retina.pixelRatio;
        particle.strokeOpacity = (0, engine_1.getRangeValue)(stroke.opacity ?? defaultOpacity);
        particle.strokeAnimation = stroke.color?.animation;
        const strokeHslColor = (0, engine_1.rangeColorToHsl)(this._engine, stroke.color) ?? particle.getFillColor();
        if (strokeHslColor) {
            particle.strokeColor = (0, engine_1.getHslAnimationFromHsl)(strokeHslColor, particle.strokeAnimation, container.retina.reduceFactor);
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
        (0, engine_1.updateColor)(particle.strokeColor, delta);
    }
}
exports.StrokeColorUpdater = StrokeColorUpdater;
