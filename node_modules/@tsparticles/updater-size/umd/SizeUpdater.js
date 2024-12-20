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
    exports.SizeUpdater = void 0;
    const engine_1 = require("@tsparticles/engine");
    const minLoops = 0;
    class SizeUpdater {
        init(particle) {
            const container = particle.container, sizeOptions = particle.options.size, sizeAnimation = sizeOptions.animation;
            if (sizeAnimation.enable) {
                particle.size.velocity =
                    ((particle.retina.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / engine_1.percentDenominator) *
                        container.retina.reduceFactor;
                if (!sizeAnimation.sync) {
                    particle.size.velocity *= (0, engine_1.getRandom)();
                }
            }
        }
        isEnabled(particle) {
            return (!particle.destroyed &&
                !particle.spawning &&
                particle.size.enable &&
                ((particle.size.maxLoops ?? minLoops) <= minLoops ||
                    ((particle.size.maxLoops ?? minLoops) > minLoops &&
                        (particle.size.loops ?? minLoops) < (particle.size.maxLoops ?? minLoops))));
        }
        reset(particle) {
            particle.size.loops = minLoops;
        }
        update(particle, delta) {
            if (!this.isEnabled(particle)) {
                return;
            }
            (0, engine_1.updateAnimation)(particle, particle.size, true, particle.options.size.animation.destroy, delta);
        }
    }
    exports.SizeUpdater = SizeUpdater;
});
