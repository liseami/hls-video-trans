import { getRandom, getRangeValue, initParticleNumericAnimationValue, percentDenominator, updateAnimation, } from "@tsparticles/engine";
export class OpacityUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const opacityOptions = particle.options.opacity, pxRatio = 1;
        particle.opacity = initParticleNumericAnimationValue(opacityOptions, pxRatio);
        const opacityAnimation = opacityOptions.animation;
        if (opacityAnimation.enable) {
            particle.opacity.velocity =
                (getRangeValue(opacityAnimation.speed) / percentDenominator) * this.container.retina.reduceFactor;
            if (!opacityAnimation.sync) {
                particle.opacity.velocity *= getRandom();
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
        updateAnimation(particle, particle.opacity, true, particle.options.opacity.animation.destroy, delta);
    }
}
