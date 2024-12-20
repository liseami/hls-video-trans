import { OutMode, calculateBounds, } from "@tsparticles/engine";
import { bounceHorizontal, bounceVertical } from "./Utils.js";
export class BounceOutMode {
    constructor(container) {
        this.container = container;
        this.modes = [
            OutMode.bounce,
            OutMode.split,
        ];
    }
    update(particle, direction, delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        const container = this.container;
        let handled = false;
        for (const plugin of container.plugins.values()) {
            if (plugin.particleBounce !== undefined) {
                handled = plugin.particleBounce(particle, delta, direction);
            }
            if (handled) {
                break;
            }
        }
        if (handled) {
            return;
        }
        const pos = particle.getPosition(), offset = particle.offset, size = particle.getRadius(), bounds = calculateBounds(pos, size), canvasSize = container.canvas.size;
        bounceHorizontal({ particle, outMode, direction, bounds, canvasSize, offset, size });
        bounceVertical({ particle, outMode, direction, bounds, canvasSize, offset, size });
    }
}
