import { isSsr } from "@tsparticles/engine";
const half = 0.5;
export class ParallaxMover {
    init() {
    }
    isEnabled(particle) {
        return (!isSsr() &&
            !particle.destroyed &&
            particle.container.actualOptions.interactivity.events.onHover.parallax.enable);
    }
    move(particle) {
        const container = particle.container, options = container.actualOptions, parallaxOptions = options.interactivity.events.onHover.parallax;
        if (isSsr() || !parallaxOptions.enable) {
            return;
        }
        const parallaxForce = parallaxOptions.force, mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const canvasSize = container.canvas.size, canvasCenter = {
            x: canvasSize.width * half,
            y: canvasSize.height * half,
        }, parallaxSmooth = parallaxOptions.smooth, factor = particle.getRadius() / parallaxForce, centerDistance = {
            x: (mousePos.x - canvasCenter.x) * factor,
            y: (mousePos.y - canvasCenter.y) * factor,
        }, { offset } = particle;
        offset.x += (centerDistance.x - offset.x) / parallaxSmooth;
        offset.y += (centerDistance.y - offset.y) / parallaxSmooth;
    }
}
