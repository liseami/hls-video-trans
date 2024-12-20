import { getRandom, percentDenominator, updateAnimation, } from "@tsparticles/engine";
const minLoops = 0;
export class SizeUpdater {
    init(particle) {
        const container = particle.container, sizeOptions = particle.options.size, sizeAnimation = sizeOptions.animation;
        if (sizeAnimation.enable) {
            particle.size.velocity =
                ((particle.retina.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / percentDenominator) *
                    container.retina.reduceFactor;
            if (!sizeAnimation.sync) {
                particle.size.velocity *= getRandom();
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
        updateAnimation(particle, particle.size, true, particle.options.size.animation.destroy, delta);
    }
}
