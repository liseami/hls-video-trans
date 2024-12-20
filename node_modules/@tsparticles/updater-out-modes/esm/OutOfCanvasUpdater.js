import { OutMode, OutModeDirection, } from "@tsparticles/engine";
import { BounceOutMode } from "./BounceOutMode.js";
import { DestroyOutMode } from "./DestroyOutMode.js";
import { NoneOutMode } from "./NoneOutMode.js";
import { OutOutMode } from "./OutOutMode.js";
const checkOutMode = (outModes, outMode) => {
    return (outModes.default === outMode ||
        outModes.bottom === outMode ||
        outModes.left === outMode ||
        outModes.right === outMode ||
        outModes.top === outMode);
};
export class OutOfCanvasUpdater {
    constructor(container) {
        this._addUpdaterIfMissing = (particle, outMode, getUpdater) => {
            const outModes = particle.options.move.outModes;
            if (!this.updaters.has(outMode) && checkOutMode(outModes, outMode)) {
                this.updaters.set(outMode, getUpdater(this.container));
            }
        };
        this._updateOutMode = (particle, delta, outMode, direction) => {
            for (const updater of this.updaters.values()) {
                updater.update(particle, direction, delta, outMode);
            }
        };
        this.container = container;
        this.updaters = new Map();
    }
    init(particle) {
        this._addUpdaterIfMissing(particle, OutMode.bounce, container => new BounceOutMode(container));
        this._addUpdaterIfMissing(particle, OutMode.out, container => new OutOutMode(container));
        this._addUpdaterIfMissing(particle, OutMode.destroy, container => new DestroyOutMode(container));
        this._addUpdaterIfMissing(particle, OutMode.none, container => new NoneOutMode(container));
    }
    isEnabled(particle) {
        return !particle.destroyed && !particle.spawning;
    }
    update(particle, delta) {
        const outModes = particle.options.move.outModes;
        this._updateOutMode(particle, delta, outModes.bottom ?? outModes.default, OutModeDirection.bottom);
        this._updateOutMode(particle, delta, outModes.left ?? outModes.default, OutModeDirection.left);
        this._updateOutMode(particle, delta, outModes.right ?? outModes.default, OutModeDirection.right);
        this._updateOutMode(particle, delta, outModes.top ?? outModes.default, OutModeDirection.top);
    }
}
