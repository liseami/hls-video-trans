(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@tsparticles/engine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ColorUpdater = void 0;
    const engine_1 = require("@tsparticles/engine");
    class ColorUpdater {
        constructor(container, engine) {
            this._container = container;
            this._engine = engine;
        }
        init(particle) {
            const hslColor = (0, engine_1.rangeColorToHsl)(this._engine, particle.options.color, particle.id, particle.options.reduceDuplicates);
            if (hslColor) {
                particle.color = (0, engine_1.getHslAnimationFromHsl)(hslColor, particle.options.color.animation, this._container.retina.reduceFactor);
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
            (0, engine_1.updateColor)(particle.color, delta);
        }
    }
    exports.ColorUpdater = ColorUpdater;
});
