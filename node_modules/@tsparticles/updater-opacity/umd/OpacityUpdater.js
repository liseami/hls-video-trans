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
    exports.OpacityUpdater = void 0;
    const engine_1 = require("@tsparticles/engine");
    class OpacityUpdater {
        constructor(container) {
            this.container = container;
        }
        init(particle) {
            const opacityOptions = particle.options.opacity, pxRatio = 1;
            particle.opacity = (0, engine_1.initParticleNumericAnimationValue)(opacityOptions, pxRatio);
            const opacityAnimation = opacityOptions.animation;
            if (opacityAnimation.enable) {
                particle.opacity.velocity =
                    ((0, engine_1.getRangeValue)(opacityAnimation.speed) / engine_1.percentDenominator) * this.container.retina.reduceFactor;
                if (!opacityAnimation.sync) {
                    particle.opacity.velocity *= (0, engine_1.getRandom)();
                }
            }
        }
        isEnabled(particle) {
            const none = 0;
            return (!particle.destroyed &&
                !particle.spawning &&
                !!particle.opacity &&
                particle.opacity.enable &&
                ((particle.opacity.maxLoops ?? none) <= none ||
                    ((particle.opacity.maxLoops ?? none) > none &&
                        (particle.opacity.loops ?? none) < (particle.opacity.maxLoops ?? none))));
        }
        reset(particle) {
            if (particle.opacity) {
                particle.opacity.time = 0;
                particle.opacity.loops = 0;
            }
        }
        update(particle, delta) {
            if (!this.isEnabled(particle) || !particle.opacity) {
                return;
            }
            (0, engine_1.updateAnimation)(particle, particle.opacity, true, particle.options.opacity.animation.destroy, delta);
        }
    }
    exports.OpacityUpdater = OpacityUpdater;
});
