import { type Container, type IDelta, type IParticleUpdater, OutMode, type Particle } from "@tsparticles/engine";
import type { IOutModeManager } from "./IOutModeManager.js";
export declare class OutOfCanvasUpdater implements IParticleUpdater {
    updaters: Map<OutMode, IOutModeManager>;
    private readonly container;
    constructor(container: Container);
    init(particle: Particle): void;
    isEnabled(particle: Particle): boolean;
    update(particle: Particle, delta: IDelta): void;
    private readonly _addUpdaterIfMissing;
    private readonly _updateOutMode;
}
