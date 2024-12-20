import { type Container, type IDelta, OutMode, type OutModeDirection, type Particle } from "@tsparticles/engine";
import type { IOutModeManager } from "./IOutModeManager.js";
export declare class BounceOutMode implements IOutModeManager {
    private readonly container;
    modes: (OutMode | keyof typeof OutMode)[];
    constructor(container: Container);
    update(particle: Particle, direction: OutModeDirection, delta: IDelta, outMode: OutMode | keyof typeof OutMode): void;
}
